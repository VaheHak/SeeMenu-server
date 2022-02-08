import express from 'express';

import OrderItemController from '../controllers/OrderItemController';
import permit from '../middlewares/permission';

const router = express.Router();

router.get('/all', permit('user'), OrderItemController.getAllOrders);
router.get('/single/order', permit('user', 'manager'), OrderItemController.getSingleOrder);

router.post('/', permit('user'), OrderItemController.createOrder);

router.put('/', permit('user', 'manager'), OrderItemController.updateOrder);
router.put('/status', permit('manager'), OrderItemController.updateOrderStatus);

router.delete('/:id', permit('user', 'manager'), OrderItemController.deleteOrder);
router.delete('/:orderId/:id', permit('user', 'manager'), OrderItemController.deleteOrderItem);

export default router;
