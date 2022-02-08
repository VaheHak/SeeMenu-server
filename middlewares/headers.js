export default function headers(req, res, next) {
  try {
    const { headers: { origin = '*' } } = req;
    const allowOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://seemenu.am',
      'https://seemenu.am',
      'https://3d97706e0616.ngrok.io',
      process.env.DOMAIN,
    ];
    if (allowOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE,PATCH');
    }
    next();
  } catch (e) {
    next(e);
  }
}
