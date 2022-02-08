import jwt from 'jsonwebtoken';
import httpError from 'http-errors';

const { JWT_SECRET } = process.env;
const EXCLUDE = [
  ['/users/login', ['POST', 'GET']],
  ['/oauth/facebook', ['GET']],
  ['/oauth/google', ['GET']],
  ['/users/register', ['POST', 'GET']],
  ['/users/create/user', ['POST', 'GET']],
  ['/users/2factor/verify', ['POST', 'GET']],
  ['/users/user/confirm', ['POST', 'GET']],
  ['/users/reset/password', ['POST', 'GET']],
  ['/users/resend/email', ['POST', 'GET']],
  ['/users/confirm/email', ['PUT', 'GET']],
  ['/restaurants/for/client', ['GET']],
  ['/contact/send', ['POST', 'GET']],
  ['/table', ['GET']],
  ['/menus', ['GET']],
  ['/menus/single/menu', ['GET']],
];

export default function Authorization(req, res, next) {
  try {
    const { authorization } = req.headers;
    const { path, method } = req;
    for (let i = 0; i < EXCLUDE.length; i++) {
      if ((EXCLUDE[i][0] === path && EXCLUDE[i][1].includes(method)) || method === 'OPTIONS') {
        next();
        return;
      }
    }
    let token;
    if (authorization) {
      token = authorization.replace('Bearer ', '');
    } else {
      throw httpError(403, 'Please login to view this');
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.userId = data.userId;
    req.loginService = data.loginService;
    next();
  } catch (e) {
    next(e);
  }
}
