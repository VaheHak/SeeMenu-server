import express from 'express';
import TableController from '../controllers/TableController';
import permit from '../middlewares/permission';

const router = express.Router();

router.get('/', permit('superadmin', 'admin', 'manager'), TableController.getTables);
router.get('/single/table', permit('superadmin', 'admin', 'manager'), TableController.getTable);

router.post('/', permit('superadmin', 'admin', 'manager'), TableController.createTable);

router.put('/', permit('superadmin', 'admin', 'manager'), TableController.updateTables);

router.delete('/:id', permit('superadmin', 'admin', 'manager'), TableController.deleteTable);

export default router;
