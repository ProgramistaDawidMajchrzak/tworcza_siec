require('dotenv').config();
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // upewnij się, że ścieżka jest dobra
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // np. ".webp"
    const uniqueName = crypto.randomBytes(16).toString('hex') + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// GET all products (public)
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const type = req.query.type;
  
    const filters = {
      visible: true,
      ...(type && { type })
    };
  
    try {
      const products = await prisma.digitalProduct.findMany({
        where: filters,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' }
      });
  
      const totalCount = await prisma.digitalProduct.count({ where: filters });
  
      res.json({
        data: products,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount
      });
    } catch (err) {
      res.status(500).json({ message: 'Błąd pobierania produktów', error: err });
    }
  });
  
  router.get('/visible', authenticateToken, requireAdmin, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const type = req.query.type;
    const search = req.query.search;
  
    const filters = {
      ...(type && { type }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { productCode: { contains: search, mode: 'insensitive' } }
        ]
      })
    };
  
    try {
      const products = await prisma.digitalProduct.findMany({
        where: filters,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'desc' }
      });
  
      const totalCount = await prisma.digitalProduct.count({ where: filters });
  
      res.json({
        data: products,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount
      });
    } catch (err) {
      res.status(500).json({ message: 'Błąd pobierania produktów (admin)', error: err });
    }
  });
  
  

router.get('/visible/:productCode', authenticateToken, requireAdmin, async (req, res) => {
    const { productCode } = req.params;
  
    try {
      const product = await prisma.digitalProduct.findUnique({
        where: { productCode }
      });

      if (!product) {
        return res.status(404).json({ message: 'Nie znaleziono tego produktu' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: 'Nie znaleziono tego produktu', error: err });
    }
  });

router.get('/:productCode', async (req, res) => {
  const { productCode } = req.params;

  try {
    const product = await prisma.digitalProduct.findUnique({
      where: { productCode }
    });

    if (!product) {
      return res.status(404).json({ message: 'Nie znaleziono tego produktu' });
    }

    if (!product.visible) {
      return res.status(403).json({ message: 'Ten produkt nie jest już dostępny', product });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Błąd podczas pobierania produktu', error: err });
  }
});

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });


router.post('/', authenticateToken, requireAdmin, upload.single('previewImage'), async (req, res) => {
  const {
    title,
    description,
    features,
    productCode,
    financing,
    special,
    visible,
    demoUrl,
    wordpressZipUrl
  } = req.body;

  const previewImageFile = req.file;

  try {
    const financingData = financing ? JSON.parse(financing) : null;
    const featuresData = features ? JSON.parse(features) : [];
    const specialBool = special === 'true';
    const visibleBool = visible === 'true';

    let previewImagePath = '';
    if (previewImageFile) {
      previewImagePath = `/uploads/${previewImageFile.filename}`;
    }

    const product = await prisma.digitalProduct.create({
      data: {
        title,
        description,
        features: featuresData,
        productCode,
        financing: financingData,
        special: specialBool,
        visible: visibleBool,
        previewImage: previewImagePath,
        demoUrl,
        wordpressZipUrl
      }
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Detailed error:', err);
    res.status(500).json({
      message: 'Error creating product',
      error: err.message
    });
  }
});

// PUT update product (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, features, financing, previewImage, demoUrl, wordpressZipUrl } = req.body;

  try {
    const updated = await prisma.digitalProduct.update({
      where: { id: parseInt(id) },
      data: { title, description, features, financing, previewImage, demoUrl, wordpressZipUrl }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err });
  }
});

// DELETE product (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.digitalProduct.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
});

router.get('/me/products', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { page = 1, limit = 10, type } = req.query;
  
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;
  
    const whereClause = {
      userId,
      ...(type ? { product: { type } } : {})
    };
  
    try {
      const [total, purchases] = await Promise.all([
        prisma.purchase.count({ where: { userId } }),
        prisma.purchase.findMany({
          where: whereClause,
          skip,
          take,
          orderBy: { id: 'desc' },
          include: {
            product: true
          }
        })
      ]);
  
      const products = purchases.map(p => p.product);
  
      res.json({
        total,
        page: parseInt(page),
        pageSize: products.length,
        products
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to load purchased products', error: err });
    }
  });

  router.patch('/visible/:id', authenticateToken, requireAdmin, async (req, res) => {
    const productId = parseInt(req.params.id);
  
    try {
      // Pobierz aktualny produkt
      const product = await prisma.digitalProduct.findUnique({
        where: { id: productId },
        select: { visible: true }
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Nie znaleziono produktu' });
      }
  
      // Przełącz visible
      const updated = await prisma.digitalProduct.update({
        where: { id: productId },
        data: { visible: !product.visible }
      });
  
      res.json({ message: 'Zmieniono widoczność produktu', product: updated });
    } catch (err) {
      res.status(500).json({ message: 'Nie udało się zaktualizować widoczności', error: err });
    }
  });

module.exports = router;
