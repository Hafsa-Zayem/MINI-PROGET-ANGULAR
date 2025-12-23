import { Router, Request, Response } from 'express';
import { cart, products } from '../data/data';

const router = Router();

// GET /api/cart
router.get('/', (req: Request, res: Response) => {
  res.json(cart);
});

// POST /api/cart
router.post('/', (req: Request, res: Response) => {
  const newCart = req.body;
  
  if (!Array.isArray(newCart)) {
    return res.status(400).json({ error: 'Cart must be an array' });
  }
  
  for (const item of newCart) {
    if (!item.productId || !item.quantity) {
      return res.status(400).json({ error: 'Invalid cart item' });
    }
    
    const product = products.find(p => p.productId === item.productId);
    if (!product || item.quantity > product.quantity) {
      return res.status(400).json({ error: 'Invalid product or quantity' });
    }
  }
  
  cart.length = 0;
  cart.push(...newCart);
  
  setTimeout(() => {
    res.status(201).json({ message: 'Cart updated', cart });
  }, 20);
});

export default router;