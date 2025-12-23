import { Router, Request, Response } from 'express';
import { products } from '../data/data';

const router = Router();

// GET /api/products
router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;
  
  if (category && typeof category === 'string') {
    const filtered = products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase() && p.quantity > 0
    );
    return res.json(filtered);
  }
  
  res.json(products);
});

// GET /api/products/category/:category
router.get('/category/:category', (req: Request, res: Response) => {
  const { category } = req.params;
  
  if (category === 'ALL') {
    return res.json(products.filter(p => p.quantity > 0));
  }
  
  const filtered = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase() && p.quantity > 0
  );
  
  res.json(filtered);
});

// GET /api/products/:id
router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  const product = products.find(p => p.productId === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

export default router;