require('dotenv').config();
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

const multer = require('multer');
const SftpClient = require('ssh2-sftp-client');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

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

  const serverConfig = {
    host: process.env.SERVER_IP,
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync(process.env.PRIVATE_KEY) // np. ~/.ssh/id_rsa
  };


  router.post('/upload-zip', authenticateToken, requireAdmin, upload.single('file'), async (req, res) => {
    const sftp = new SftpClient();
    const localPath = req.file.path;
    const remotePath = `/var/www/zips/${req.file.originalname}`;
  
    try {
      await sftp.connect(serverConfig);
      await sftp.put(localPath, remotePath);
      await sftp.end();
  
      fs.unlinkSync(localPath);
  
      res.json({ success: true, message: 'Plik wysłany na serwer!', url: `http://${serverConfig.host}/zips/${req.file.originalname}` });
    } catch (err) {
      console.error('Błąd uploadu:', err);
      res.status(500).json({ success: false, message: 'Nie udało się wysłać pliku.' });
    }
  });
  
  router.get('/zips/list', authenticateToken, requireAdmin, async (req, res) => {
    const sftp = new SftpClient();
  
    // Pobierz query parametry z URL, np. /zips/list?page=1&limit=10&search=STR
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = (req.query.search || '').toLowerCase();
  
    try {
      await sftp.connect(serverConfig);
      const allFiles = await sftp.list('/var/www/zips');
  
      // Filtrowanie po nazwie i tylko pliki .zip
      const filteredFiles = allFiles
        // .filter(file => file.name.endsWith('.zip'))
        .filter(file => file.name.toLowerCase().includes(search));
  
      const total = filteredFiles.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
  
      const paginatedFiles = filteredFiles.slice(start, end).map(file => ({
        name: file.name,
        size: file.size,
        modifyTime: file.modifyTime,
        url: `http://${serverConfig.host}/zips/${file.name}`
      }));
  
      await sftp.end();
  
      res.json({
        success: true,
        zips: paginatedFiles,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    } catch (err) {
      console.error('Błąd listowania plików ZIP:', err);
      res.status(500).json({ success: false, message: 'Nie udało się pobrać listy plików.' });
    }
  });
  

module.exports = router;
