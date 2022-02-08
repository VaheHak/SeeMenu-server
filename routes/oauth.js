import express from 'express';
import rateLimit from 'express-rate-limit';

import OauthController from '../controllers/OauthController';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 105,
  message:
    'Too many accounts signIn from this IP, please try again after an 15 minutes',
});
const router = express.Router();

router.get('/facebook', apiLimiter, OauthController.redirectFacebook);
router.get('/google', apiLimiter, OauthController.redirectGoogle);
router.get('/facebook/user', apiLimiter, OauthController.redirectUserFacebook);
router.get('/google/user', apiLimiter, OauthController.redirectUserGoogle);

export default router;
