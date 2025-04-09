const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins for CORS
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'https://rose-three-xi.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser tools like curl/postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log('❌ Blocked by CORS:', origin); // Debugging info
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/orders', orderRoutes);

// ✅ Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
