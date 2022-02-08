import HttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import { Restaurant, Users } from '../models';
import Validate from '../services/validate';
import SendMail from '../services/nodemailer';

const { JWT_SECRET } = process.env;

class UsersController {
  static myAccount = async (req, res, next) => {
    try {
      const user = await Users.findByPk(req.userId);

      if (user && user.user_status !== true) {
        res.status(403).json({
          errors: {
            status: 'You are deactivated',
          },
        });
        return;
      }

      res.json({
        status: 'ok',
        result: user,
        loginService: req.loginService,
      });
    } catch (e) {
      next(e);
    }
  }

  static allUsers = async (req, res, next) => {
    try {
      const {
        firstName, lastName, phone, email, createdAt,
      } = req.query;

      const where = {
        role: { $ne: 'superadmin' },
      };

      if (firstName) {
        where.firstName = { $like: `%${firstName}%` };
      }
      if (lastName) {
        where.lastName = { $like: `%${lastName}%` };
      }
      if (phone) {
        where.phone = { $like: `%${phone}%` };
      }
      if (email) {
        where.email = { $like: `%${email}%` };
      }
      if (createdAt) {
        const y = moment(createdAt);
        where.createdAt = {
          $gte: new Date(y.format('YYYY-MM-DD 00:00:00')),
          $lte: new Date(y.format('YYYY-MM-DD 23:59:59')),
        };
      }

      const user = await Users.findAll({
        where,
        include: [{
          model: Restaurant,
          as: 'restaurants',
          required: false,
        }],
      });

      res.json({
        status: 'ok',
        result: user,
      });
    } catch (e) {
      next(e);
    }
  }

  static managers = async (req, res, next) => {
    try {
      const {
        firstName, lastName, phone, email, createdAt, restaurantName, address,
      } = req.query;
      const where = {
        managerId: req.userId,
        user_status: true,
      };
      if (firstName) {
        where.firstName = { $like: `%${firstName}%` };
      }
      if (lastName) {
        where.lastName = { $like: `%${lastName}%` };
      }
      if (phone) {
        where.phone = { $like: `%${phone}%` };
      }
      if (email) {
        where.email = { $like: `%${email}%` };
      }
      if (createdAt) {
        const y = moment(createdAt);
        where.createdAt = {
          $gte: new Date(y.format('YYYY-MM-DD 00:00:00')),
          $lte: new Date(y.format('YYYY-MM-DD 23:59:59')),
        };
      }

      const whereRestaurant = {};
      if (restaurantName) {
        whereRestaurant.name = { $like: `%${restaurantName}%` };
      }
      if (address) {
        whereRestaurant.address = { $like: `%${address}%` };
      }

      const manager = await Users.findAll({
        where,
        include: [{
          model: Restaurant,
          as: 'managerRest',
          where: whereRestaurant,
          required: true,
        }],
      });

      res.json({
        status: 'ok',
        result: manager,
      });
    } catch (e) {
      next(e);
    }
  }

  static oneManager = async (req, res, next) => {
    try {
      const { id } = req.query;

      const manager = await Users.findAll({
        where: {
          id,
          user_status: true,
        },
      });

      res.json({
        status: 'ok',
        result: manager,
      });
    } catch (e) {
      next(e);
    }
  }

  static register = async (req, res, next) => {
    try {
      const {
        firstName, lastName, phone, email, password,
      } = req.body;

      await Validate(req.body, {
        firstName: 'string|required|alpha|minLength:2|maxLength:20',
        lastName: 'string|required|alpha|minLength:3|maxLength:20',
        phone: 'required|minLength:9|maxLength:12',
        email: 'required|email',
        password: 'required|string|minLength:8|maxLength:30',
      }, { phone });

      const unique = await Users.findOne({
        where: {
          email,
        },
      });

      if (unique) {
        res.status(422).json({
          errors: {
            email: 'This email is already busy',
          },
        });
        return;
      }

      const activationCode = uuidv4();

      const user = await Users.create({
        firstName,
        lastName,
        phone,
        activation_code: activationCode,
        email,
        password,
      });

      await SendMail('Verification', { firstName, lastName, activationCode }, 'SeeMenu - Email Verification', email);

      res.json({
        status: 'Please verify your email',
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static creatManager = async (req, res, next) => {
    try {
      await Validate(req.body, {
        firstName: 'string|required|alpha|minLength:2|maxLength:20',
        lastName: 'string|required|alpha|minLength:3|maxLength:20',
        email: 'required|email',
        restaurantId: 'required|integer',
      });

      const {
        firstName, lastName, email, restaurantId,
      } = req.body;

      const unique = await Users.findOne({
        where: {
          email,
        },
      });

      if (unique) {
        res.status(422).json({
          errors: {
            email: 'This email is already busy',
          },
        });
        return;
      }

      const rest = await Restaurant.findByPk(restaurantId);

      let phone = '###';
      if (rest && rest.phone) {
        phone = rest.phone;
      }

      const activationCode = uuidv4();

      const user = await Users.create({
        firstName,
        lastName,
        role: 'manager',
        activation_code: activationCode,
        email,
        password: activationCode,
        managerId: req.userId,
        phone,
      });

      await Restaurant.update({
        restManagerId: user.id,
      }, {
        where: {
          id: restaurantId,
        },
      });

      await SendMail('Confirm', { firstName, lastName, activationCode }, 'SeeMenu - Choose Password', email);

      res.json({
        status: 'ok',
        msg: 'Your manager must choose a new password',
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static createUser = async (req, res, next) => {
    try {
      const {
        firstName, lastName, phone, email, password,
      } = req.body;

      await Validate(req.body, {
        firstName: 'string|required|alpha|minLength:2|maxLength:20',
        lastName: 'string|required|alpha|minLength:3|maxLength:20',
        phone: 'required|minLength:9|maxLength:12',
        email: 'required|email',
        password: 'required|string|minLength:8|maxLength:30',
      }, { phone });

      const unique = await Users.findOne({
        where: {
          email,
        },
      });

      if (unique) {
        res.status(422).json({
          errors: {
            email: 'This email is already busy',
          },
        });
        return;
      }

      const activationCode = uuidv4();

      const user = await Users.create({
        firstName,
        lastName,
        phone,
        role: 'user',
        activation_code: activationCode,
        email,
        password,
      });

      await SendMail('Verification', { firstName, lastName, activationCode }, 'SeeMenu - Email Verification', email);

      res.json({
        status: 'Please verify your email',
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static userVerification = async (req, res, next) => {
    try {
      await Validate(req.body, {
        activationCode: 'required',
      });

      const { activationCode } = req.body;

      const user = await Users.findOne({
        where: {
          activation_code: activationCode,
        },
      });

      if (user) {
        await Users.update({
          status: 'activated',
        }, {
          where: {
            id: user.id,
          },
        });

        res.json({
          status: 'Activated',
        });
        return;
      }

      res.status(403).json({
        errors: 'No such user. Try to register again.',
      });
    } catch (e) {
      next(e);
    }
  }

  static login = async (req, res, next) => {
    try {
      await Validate(req.body, {
        email: 'required|email',
        password: 'required|string|minLength:8|maxLength:30',
        service: 'string',
      });

      const { email, password, service } = req.body;

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user || user.getDataValue('password') !== Users.passwordHash(password)) {
        throw HttpError(403, { errors: { password: 'invalid email or password' } });
      }

      if (user && user.getDataValue('status') !== 'activated') {
        res.status(403).json({
          errors: {
            status: 'You aren\'t verificated. We send mail to your email for verification',
          },
        });
        return;
      }

      if (user && user.getDataValue('user_status') !== true) {
        res.status(403).json({
          errors: {
            status: 'You are deactivated',
          },
        });
        return;
      }
      if (user && user.two_factor_auth === true) {
        const uuid = uuidv4();
        const digit = _.random(0, 999999);
        const token = jwt.sign({ digit, loginService: service }, JWT_SECRET, { expiresIn: '3m' });

        await Users.update({
          secret_key: token,
          email_code: digit,
          uniq_key: uuid,
        }, {
          where: {
            email,
          },
        });

        await SendMail('TwoFactor',
          { firstName: user.firstName, lastName: user.lastName, digitCode: digit },
          'SeeMenu - Two-factor authentication', email);

        res.json({
          status: 'ok',
          uniq_key: uuid,
        });
        return;
      }

      const token = jwt.sign({
        userId: user.id, role: user.role, loginService: service,
      }, JWT_SECRET);

      res.json({
        status: 'ok',
        result: user,
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  static VerifyDigitCode = async (req, res, next) => {
    try {
      const { uniqKey, digitCode } = req.body;
      const users = await Users.findOne({
        where: {
          uniq_key: uniqKey,
        },
      });
      if (users) {
        try {
          const decoded = jwt.verify(users.secret_key, JWT_SECRET);
          if (decoded && +digitCode === +decoded.digit) {
            const token = jwt.sign({ userId: users.id, role: users.role }, JWT_SECRET);
            res.json({
              status: 'ok',
              token,
              role: users.role,
              service: decoded.loginService,
            });
            return;
          }
          res.status(403).json({
            errors: { digit: 'Wrong digit code' },
          });
          return;
        } catch (err) {
          if (err) {
            throw HttpError(403, { errors: { expires: 'Digit-code expired' } });
          }
        }
      }
      throw HttpError(403, { errors: { user: 'No such user' } });
    } catch (e) {
      next(e);
    }
  }

  static resetPassword = async (req, res, next) => {
    try {
      await Validate(req.body, {
        email: 'required|email',
      });

      const { email } = req.body;

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (user && user.user_status !== true) {
        res.status(403).json({
          errors: {
            status: 'You are deactivated',
          },
        });
        return;
      }

      if (user) {
        const activationCode = uuidv4();
        await Users.update({
          activation_code: activationCode,
        }, {
          where: {
            email,
          },
        });

        await SendMail('ResetPassword', { user, email, activationCode }, 'SeeMenu - Email Confirmation', email);

        res.json({
          status: 'ok',
          msg: 'Please confirm Email',
          result: user,
        });
        return;
      }

      res.status(403).json({
        errors: 'No such user',
      });
    } catch (e) {
      next(e);
    }
  }

  static resendEmail = async (req, res, next) => {
    try {
      await Validate(req.body, {
        email: 'required|email',
      });

      const { email } = req.body;

      const activationCode = uuidv4();

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (user) {
        await Users.update({
          status: 'pending',
          activation_code: activationCode,
        }, {
          where: {
            email,
          },
        });

        if (user && user.role === 'admin') {
          await SendMail('Verification', {
            firstName: user.firstName,
            lastName: user.lastName,
            activationCode,
          }, 'SeeMenu - Email Verification', email);
        }

        if (user && user.role === 'manager') {
          await SendMail('Confirm', {
            firstName: user.firstName,
            lastName: user.lastName,
            activationCode,
          }, 'SeeMenu - Choose Password', email);
        }

        res.json({
          status: 'ok',
          msg: 'We send email to your mail. Please check your email',
        });
        return;
      }

      res.status(403).json({
        errors: 'No such user',
      });
    } catch (e) {
      next(e);
    }
  }

  static changePassword = async (req, res, next) => {
    try {
      await Validate(req.body, {
        activationCode: 'required',
        password: 'required|string|minLength:8|maxLength:30',
      });

      const { activationCode, password } = req.body;

      const user = await Users.findOne({
        where: {
          activation_code: activationCode,
        },
      });

      if (user && user.user_status !== true) {
        res.status(403).json({
          errors: {
            status: 'You are deactivated',
          },
        });
        return;
      }

      if (user) {
        await Users.update({
          password,
          status: 'activated',
          activationCode: null,
        }, {
          where: {
            id: user.id,
          },
        });

        res.json({
          status: 'Your password has changed',
        });
        return;
      }

      res.status(403).json({
        errors: 'No such user. Try again.',
      });
    } catch (e) {
      next(e);
    }
  }

  static twoFactorAuthentication = async (req, res, next) => {
    try {
      const {
        email, twoFactorAuth,
      } = req.body;

      await Validate(req.body, {
        email: 'required|email',
        twoFactorAuth: 'required|boolean',
      });

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (user && user.getDataValue('status') !== 'activated') {
        throw HttpError(403, { errors: { status: 'You aren\'t verificated. We send mail to your email for verification' } });
      }

      if (user && user.getDataValue('user_status') !== true) {
        throw HttpError(403, { errors: { status: 'You are deactivated' } });
      }

      const twoFactor = await Users.update({
        two_factor_auth: twoFactorAuth,
      }, {
        where: {
          email,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: twoFactor,
      });
    } catch (e) {
      next(e);
    }
  }

  static update = async (req, res, next) => {
    try {
      const {
        id, firstName, lastName, phone, email, oldPassword, password,
      } = req.body;

      await Validate(req.body, {
        id: 'required|integer',
        firstName: 'string|alpha|minLength:2|maxLength:20',
        lastName: 'string|alpha|minLength:3|maxLength:20',
        phone: 'minLength:3|maxLength:12',
        email: 'email',
        oldPassword: 'string|minLength:8|maxLength:30',
        password: 'string|minLength:8|maxLength:30',
      }, { phone });

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (password) {
        if (!user || user.getDataValue('password') !== Users.passwordHash(oldPassword)) {
          throw HttpError(403, { errors: { oldPassword: 'Invalid email or password' } });
        }

        if (user && user.getDataValue('status') !== 'activated') {
          throw HttpError(403, { errors: { status: 'You aren\'t verificated. We send mail to your email for verification' } });
        }

        if (user && user.getDataValue('user_status') !== true) {
          throw HttpError(403, { errors: { status: 'You are deactivated' } });
        }
        await Users.update({
          password,
        }, {
          where: {
            id,
          },
        });
      }

      const userUpdate = await Users.update({
        firstName, lastName, phone,
      }, {
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: userUpdate,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateStatus = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'required|integer',
        status: 'required|boolean',
      });

      const { id, status } = req.body;

      const user = await Users.update({ user_status: status }, {
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: user,
      });
    } catch (e) {
      next(e);
    }
  }

  static delete = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
      });

      const { id } = req.params;

      const user = await Users.destroy({
        where: {
          id,
        },
        limit: 1,
      });

      res.json({
        status: 'ok',
        msg: 'Deleted',
        result: user,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default UsersController;
