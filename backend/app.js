require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const purchaseRoutes = require('./routes/purchase');
const cookieParser = require('cookie-parser');

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/purchase', purchaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

