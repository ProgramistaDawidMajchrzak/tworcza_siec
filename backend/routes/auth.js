const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, authenticateTokenCookie, requireAdmin } = require('../middleware/authMiddleware');


const prisma = new PrismaClient();

router.post('/register', authenticateToken, requireAdmin, async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed }
  });

  res.status(201).json({ message: 'User registered', user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dni
    })
    .json({ 
      userId: user.id, 
      email: user.email,
      token: token // Dodaj token do odpowiedzi JSON
    });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
});

router.get('/me', authenticateTokenCookie, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { id: true, email: true, role: true },
  });

  res.json(user);
});

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//   const token = jwt.sign(
//     { userId: user.id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: '7d' }
//   );

//   res.json({ token, userId: user.id, email: user.email });
// });


// router.post('/register-admin', async (req, res) => {
//     const { email, password } = req.body;
  
//     const existing = await prisma.user.findUnique({ where: { email } });
//     if (existing) return res.status(400).json({ message: 'Email already in use' });
  
//     const hashed = await bcrypt.hash(password, 10);
  
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashed,
//         role: 'admin'
//       }
//     });
  
//     res.status(201).json({ message: 'Admin user created', user });
//   });

// GET /users?search=email@example.com&page=1&limit=10
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
    const { search = '', page = 1, limit = 10 } = req.query;
  
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);
  
    try {
      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where: {
            email: {
              contains: search,
              mode: 'insensitive'
            }
          },
          skip,
          take,
          orderBy: { createdAt: 'desc' }
        }),
        prisma.user.count({
          where: {
            email: {
              contains: search,
              mode: 'insensitive'
            }
          }
        })
      ]);
  
      res.json({
        users,
        total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / take)
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err });
    }
  });
  

module.exports = router;
