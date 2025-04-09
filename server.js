const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ✅ Define default local port
const LOCAL_PORT = 5000;
const PORT = process.env.PORT || LOCAL_PORT;

// ✅ Allowed frontend origins
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'https://rose-three-xi.vercel.app', // Your Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log('❌ Blocked by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send(`API running on port ${PORT}`);
});

// ✅ Connect DB & start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      const env = process.env.NODE_ENV === 'production' ? '🌐 Live (Railway)' : '💻 Local';
      console.log(`✅ MongoDB connected successfully`);
      console.log(`🚀 ${env} server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err.message);
  });
