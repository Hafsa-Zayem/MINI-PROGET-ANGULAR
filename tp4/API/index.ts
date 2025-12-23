import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import authRoutes from './routes/auth.routes';
import productsRoutes from './routes/products.routes';
import cartRoutes from './routes/cart.routes';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from Angular build
const distPath = path.join(__dirname, '../dist/tp4/browser');
app.use(express.static(distPath));

// API Routes (must be before wildcard)
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

// 404 for API routes that don't match
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve Angular app for SPA routing (catch-all, must be last)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start
app.listen(port, () => {
  console.log(`\n🚀 E-commerce Application Server`);
  console.log(`📍 Application: http://localhost:${port}`);
  console.log(`📡 API Routes: http://localhost:${port}/api\n`);
});