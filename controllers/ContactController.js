import Validate from '../services/validate';
import SendMail from '../services/nodemailer';

class ContactController {
  static index = async (req, res, next) => {
    try {
      await Validate(req.body, {
        name: 'string|required|alpha|minLength:2|maxLength:20',
        themes: 'string|minLength:3|maxLength:20',
        email: 'required|email',
        message: 'required|string|minLength:4|maxLength:100',
      });

      const {
        name, email, themes, message, ownerEmail, managerEmail,
      } = req.body;

      await SendMail(
        'Contact',
        {
          name, email, themes, message,
        },
        'SeeMenu - Օգտատերի հարցում',
        [ownerEmail, managerEmail],
      );

      res.json({
        status: 'ok',
      });
    } catch (e) {
      next(e);
    }
  }
}

export default ContactController;
