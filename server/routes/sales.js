import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
  getSales, createSale, deleteSale, toggleSalePaid,
  getExpenses, createExpense, deleteExpense,
} from '../controllers/saleController.js';

const router = Router();

router.get('/', auth, getSales);
router.post('/', auth, createSale);
router.patch('/:id/paid', auth, toggleSalePaid);
router.delete('/:id', auth, deleteSale);

router.get('/expenses', auth, getExpenses);
router.post('/expenses', auth, createExpense);
router.delete('/expenses/:id', auth, deleteExpense);

export default router;
