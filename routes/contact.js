import express from 'express';

import ContactController from '../controllers/ContactController';

const router = express.Router();

router.post('/send', ContactController.index);

export default router;
