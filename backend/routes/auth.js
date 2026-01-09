const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, authenticateTokenCookie, requireAdmin } = require('../middleware/authMiddleware');
const crypto = require("crypto");
const { sendMail } = require("../utils/mailer");



const prisma = new PrismaClient();

router.post("/test-email", async (req, res) => {
  try {
    const { to } = req.body;
    if (!to) return res.status(400).json({ message: "Missing to" });

    await sendMail({
      to,
      subject: "Test Resend",
      html: "<p>Działa ✅ (test wysyłki)</p>",
    });

    res.json({ ok: true });
  } catch (e) {
    console.error("TEST_EMAIL_ERROR:", e);
    res.status(500).json({ error: String(e) });
  }
});


router.post("/register-client", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const exp = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "client",
        emailVerified: false,
        verifyTokenHash: tokenHash,
        verifyTokenExp: exp,
      },
    });

    const verifyUrl = `${process.env.API_URL}/api/auth/verify-email?token=${rawToken}`;

    await sendMail({
      to: email,
      subject: "Potwierdź adres e-mail",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>Potwierdź adres e-mail</h2>
          <p>Kliknij w przycisk, aby aktywować konto:</p>
          <p><a href="${verifyUrl}" style="display:inline-block;padding:10px 14px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Potwierdź e-mail</a></p>
          <p>Link ważny 24h.</p>
        </div>
      `,
    });

    return res.status(201).json({ message: "Account created. Check your email to verify it." });
  } catch (err) {
    console.error("REGISTER_CLIENT_ERROR:", err);
    return res.status(500).json({ message: "Registration failed" });
  }
});


router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send("Missing token");

    const tokenHash = crypto.createHash("sha256").update(String(token)).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        verifyTokenHash: tokenHash,
        verifyTokenExp: { gt: new Date() },
      },
    });

    if (!user) return res.status(400).send("Invalid or expired token");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verifyTokenHash: null,
        verifyTokenExp: null,
      },
    });

    return res.redirect(`${process.env.APP_URL}/email-verified`);
  } catch (err) {
    console.error("VERIFY_EMAIL_ERROR:", err);
    return res.status(500).send("Verification failed");
  }
});


router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await prisma.user.findUnique({ where: { email } });

    // celowo nie zdradzamy czy istnieje:
    if (!user) return res.json({ message: "If account exists, email was sent." });
    if (user.emailVerified) return res.status(400).json({ message: "Email already verified." });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const exp = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.user.update({
      where: { id: user.id },
      data: { verifyTokenHash: tokenHash, verifyTokenExp: exp },
    });

    const verifyUrl = `${process.env.API_URL}/api/auth/verify-email?token=${rawToken}`;

    await sendMail({
      to: email,
      subject: "Potwierdź adres e-mail (ponownie)",
      html: `<p>Kliknij: <a href="${verifyUrl}">Potwierdź e-mail</a></p>`,
    });

    return res.json({ message: "Verification email sent." });
  } catch (err) {
    console.error("RESEND_VERIFICATION_ERROR:", err);
    return res.status(500).json({ message: "Failed to resend email" });
  }
});



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

  if (user.role === "client" && !user.emailVerified) {
    return res.status(403).json({ message: "Please verify your email before logging in." });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    userId: user.id,
    email: user.email,
    role: user.role,
    token,
  });
});


router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});


router.get('/me', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { id: true, email: true, role: true },
  });

  res.json(user);
});


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
