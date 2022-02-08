import express from 'express';

import OrdersController from '../controllers/OrdersController';
import permit from '../middlewares/permission';

const router = express.Router();

router.get('/all', permit('superadmin'), OrdersController.getAllOrders);
router.get('/', permit('superadmin', 'admin', 'manager'), OrdersController.getOrders);
router.get('/single/order', permit('superadmin'), OrdersController.getSingleOrder);

router.post('/', permit('superadmin', 'admin', 'manager'), OrdersController.creatQrOrder);

router.put('/', permit('superadmin', 'admin', 'manager'), OrdersController.updateQrOrder);

router.delete('/:id', permit('superadmin', 'admin', 'manager'), OrdersController.deleteQrOrder);

export default router;
