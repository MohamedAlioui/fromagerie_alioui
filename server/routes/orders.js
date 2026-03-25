import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
  createOrder, trackOrder, getAllOrders, getOrderById, updateStatus,
} from '../controllers/orderController.js';

const router = Router();

router.post('/', createOrder);
router.get('/track', trackOrder);
router.get('/', auth, getAllOrders);
router.get('/:id', auth, getOrderById);
router.patch('/:id/status', auth, updateStatus);

export default router;
