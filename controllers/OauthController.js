import HttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Users } from '../models';
import Validate from '../services/validate';

const { JWT_SECRET } = process.env;

class OauthController {
  static redirectFacebook = async (req, res, next) => {
    try {
      await Validate(req.query, {
        accessToken: 'required',
      });
      const { accessToken } = req.query;

      const { data: profileData } = await axios({
        url: 'https://graph.facebook.com/me',
        method: 'get',
        params: {
          fields: ['id', 'email', 'first_name', 'last_name'].join(','),
          access_token: accessToken,
        },
      });

      let user = await Users.findOne({
        where: {
          email: profileData.email,
        },
      });

      if (!user) {
        user = await Users.create({
          firstName: profileData.first_name,
          lastName: profileData.last_name,
          email: profileData.email,
          phone: '*********',
          role: 'admin',
          password: accessToken,
          status: 'activated',
        });
      }

      const token = jwt.sign({
        userId: user.getDataValue('id'),
        role: user.getDataValue('role'),
        loginService: 'facebook',
      }, JWT_SECRET);
      if (!token) throw new HttpError(403, 'Login fail!');

      res.json({
        status: 'ok',
        result: user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };

  static redirectUserFacebook = async (req, res, next) => {
    try {
      await Validate(req.query, {
        accessToken: 'required',
      });
      const { accessToken } = req.query;

      const { data: profileData } = await axios({
        url: 'https://graph.facebook.com/me',
        method: 'get',
        params: {
          fields: ['id', 'email', 'first_name', 'last_name'].join(','),
          access_token: accessToken,
        },
      });

      let user = await Users.findOne({
        where: {
          email: profileData.email,
        },
      });

      if (!user) {
        user = await Users.create({
          firstName: profileData.first_name,
          lastName: profileData.last_name,
          email: profileData.email,
          phone: '*********',
          role: 'user',
          password: accessToken,
          status: 'activated',
        });
      }

      const token = jwt.sign({
        userId: user.getDataValue('id'),
        role: user.getDataValue('role'),
        loginService: 'facebook',
      }, JWT_SECRET);
      if (!token) throw new HttpError(403, 'Login fail!');

      res.json({
        status: 'ok',
        result: user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };

  static redirectGoogle = async (req, res, next) => {
    try {
      await Validate(req.query, {
        accessToken: 'required',
      });
      const { accessToken } = req.query;

      const { data: profileData } = await axios({
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        method: 'get',
        params: {
          personFields: ['emailAddresses', 'names'].join(','),
        },
      });

      let user = await Users.findOne({
        where: {
          email: profileData.email,
        },
      });

      if (!user) {
        user = await Users.create({
          firstName: profileData.first_name,
          lastName: profileData.last_name,
          email: profileData.email,
          phone: '*********',
          role: 'admin',
          password: accessToken,
          status: 'activated',
        });
      }

      const token = jwt.sign({
        userId: user.getDataValue('id'),
        role: user.getDataValue('role'),
        loginService: 'google',
      }, JWT_SECRET);
      if (!token) throw new HttpError(403, 'Login fail!');

      res.json({
        status: 'ok',
        result: user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };

  static redirectUserGoogle = async (req, res, next) => {
    try {
      await Validate(req.query, {
        accessToken: 'required',
      });
      const { accessToken } = req.query;

      const { data: profileData } = await axios({
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        method: 'get',
        params: {
          personFields: ['emailAddresses', 'names'].join(','),
        },
      });

      let user = await Users.findOne({
        where: {
          email: profileData.email,
        },
      });

      if (!user) {
        user = await Users.create({
          firstName: profileData.first_name,
          lastName: profileData.last_name,
          email: profileData.email,
          phone: '*********',
          role: 'user',
          password: accessToken,
          status: 'activated',
        });
      }

      const token = jwt.sign({
        userId: user.getDataValue('id'),
        role: user.getDataValue('role'),
        loginService: 'google',
      }, JWT_SECRET);
      if (!token) throw new HttpError(403, 'Login fail!');

      res.json({
        status: 'ok',
        result: user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default OauthController;
