const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

const prisma = new PrismaClient();

router.post('/assign', authenticateToken, requireAdmin, async (req, res) => {
    const { userId, productId } = req.body;
  
    if (!userId || !productId) {
      return res.status(400).json({ message: 'userId i productId są wymagane' });
    }
  
    try {
      // Sprawdź czy user i produkt istnieją
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const product = await prisma.digitalProduct.findUnique({ where: { id: productId } });
  
      if (!user || !product) {
        return res.status(404).json({ message: 'Użytkownik lub produkt nie istnieje' });
      }
  
      // Sprawdź czy już przypisany
      const existing = await prisma.purchase.findFirst({
        where: { userId, productId }
      });
  
      if (existing) {
        return res.status(400).json({ message: 'Ten produkt jest już przypisany temu użytkownikowi' });
      }
  
      const purchase = await prisma.purchase.create({
        data: {
          userId,
          productId
        }
      });

      if (product.visible === true) {
        await prisma.digitalProduct.update({
          where: { id: productId },
          data: { visible: false }
        });
      }
  
      res.status(201).json({ message: 'Produkt przypisany do użytkownika', purchase });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Błąd przy przypisywaniu produktu', error: err });
    }
});

router.delete('/assign/:id', authenticateToken, requireAdmin, async (req, res) => {
    const { id } = req.params;
  
    try {
      const existing = await prisma.purchase.findUnique({
        where: { id: parseInt(id) }
      });
  
      if (!existing) {
        return res.status(404).json({ message: 'To przypisanie nie istnieje' });
      }
  
      await prisma.purchase.delete({
        where: { id: parseInt(id) }
      });
  
      res.json({ message: 'Przypisanie usunięte pomyślnie' });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Błąd przy usuwaniu przypisania', error: err });
    }
});

router.get('/assignments', authenticateToken, requireAdmin, async (req, res) => {
    const { page = 1, limit = 10, userId, productId } = req.query;
  
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;
  
    try {
      const where = {};
  
      if (userId) {
        where.userId = parseInt(userId);
      }
  
      if (productId) {
        where.productId = parseInt(productId);
      }
  
      const [total, data] = await Promise.all([
        prisma.purchase.count({ where }),
        prisma.purchase.findMany({
          where,
          skip,
          take,
          orderBy: { purchasedAt: 'desc' },
          include: {
            user: {
              select: { id: true, email: true }
            },
            product: {
              select: { id: true, title: true, productCode: true }
            }
          }
        })
      ]);
  
      res.json({
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / take),
        data
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Błąd przy pobieraniu przypisań', error: err });
    }
  });
  
  

module.exports = router;
