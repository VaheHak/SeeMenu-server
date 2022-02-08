import express from 'express';

import rateLimit from 'express-rate-limit';
import UsersController from '../controllers/UsersController';
import permit from '../middlewares/permission';

const apiLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100,
  message:
    'Too many accounts signIn from this IP, please try again after a half hour',
});
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message:
    'Too many accounts created from this IP, please try again after an hour',
});
const router = express.Router();

router.get('/', permit('superadmin', 'admin', 'manager', 'user'), UsersController.myAccount);
router.get('/all', permit('superadmin'), UsersController.allUsers);
router.get('/managers', permit('superadmin', 'admin'), UsersController.managers);
router.get('/single/manager', permit('superadmin', 'admin'), UsersController.oneManager);

router.post('/register', createAccountLimiter, UsersController.register);
router.post('/manager', permit('superadmin', 'admin'), createAccountLimiter, UsersController.creatManager);
router.post('/create/user', createAccountLimiter, UsersController.createUser);
router.post('/user/confirm', UsersController.userVerification);
router.post('/login', apiLimiter, UsersController.login);
router.post('/reset/password', createAccountLimiter, UsersController.resetPassword);
router.post('/resend/email', createAccountLimiter, UsersController.resendEmail);
router.post('/2factor/verify', createAccountLimiter, UsersController.VerifyDigitCode);

router.put('/confirm/email', createAccountLimiter, UsersController.changePassword);
router.put('/update', permit('superadmin', 'admin', 'manager', 'user'), UsersController.update);
router.put('/update/status', permit('superadmin'), UsersController.updateStatus);
router.put('/2factor/authentication', createAccountLimiter, UsersController.twoFactorAuthentication);

router.delete('/:id', permit('superadmin', 'admin', 'manager'), UsersController.delete);

export default router;
