const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ✅ Default local port
const LOCAL_PORT = 5000;
const PORT = process.env.PORT || LOCAL_PORT;

// ✅ Allowed frontend origins (local + production)
const allowedOrigins = [
  'http://localhost:3000', // local development
  process.env.CLIENT_URL || 'https://rose-three-xi.vercel.app', // production frontend
];

// ✅ CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      console.log('⚠️ No Origin header (e.g. Postman) — allowing');
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn('❌ Blocked by CORS:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send(`✅ API running on port ${PORT}`);
});

// ✅ Connect DB & Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      const isProd = process.env.NODE_ENV === 'production';
      console.log('✅ MongoDB connected successfully');
      console.log(`🚀 ${isProd ? '🌐 Live (Railway)' : '💻 Local'} server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err.message);
  });
