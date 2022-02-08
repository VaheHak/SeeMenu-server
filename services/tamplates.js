const { VERIFICATION_URL, CONFIRM_URL } = process.env;

export default {
  Verification: ({ firstName, lastName, activationCode }) => `
    <div style="width: 80%;height:100%;margin: 0 auto;color: black;">
    <div style="width: 100%;height: 80px;font-weight: bold;font-size: 50px;
                    background: black;color: orangered;margin: 0 auto 50px;font-family: monospace;
                    text-align: center;">SeeMenu</div>
    <h1 style="margin: 0 0 50px 0;text-align: center;">Welcome to our site</h1>
    <strong style="margin: 0 0 10px 100px">Hi ${firstName} ${lastName}</strong>
    <p style="word-break: break-word;margin: 0 0 50px 100px">
      To complete email verification, please click the verify button below</p>
    <a style="width: 150px;padding: 8px 20px;background: green;font-weight: bold;
       text-align: center;color:white;margin: 0 auto 30px;display: block;
       border-radius: 5px;word-break: break-word;text-decoration: none;box-shadow: 1px 1px 5px black"
       href="${VERIFICATION_URL + activationCode}">Verify your Email</a>
    <p style="word-break: break-word;margin: 0 0 30px 0;text-align: center;">
      If you did not create an account using this address, please ignore this email.
    </p>
    <i style="margin: 0 0 10px 100px;display: block">Regards</i>
    <strong style="margin: 0 0 0 100px">Team SeeMenu</strong>
  </div>`,

  TwoFactor: ({ firstName, lastName, digitCode }) => `
    <div style="width: 80%;height:100%;margin: 0 auto;color: black;">
    <div style="width: 100%;height: 80px;font-weight: bold;font-size: 50px;
                    background: black;color: orangered;margin: 0 auto 50px;font-family: monospace;
                    text-align: center;">SeeMenu</div>
    <h1 style="margin: 0 0 50px 0;text-align: center;">Welcome to our site</h1>
    <strong style="margin: 0 0 10px 100px">Hi ${firstName} ${lastName}</strong>
    <p style="word-break: break-word;margin: 0 0 50px 100px">
      To complete Two-factor authentication, copy this code and put in site</p>
    <div style="width: 170px;padding: 20px 20px;background: green;font-weight: bold;
       text-align: center;color:white;margin: 0 auto 30px;display: block;font-size: 50px;
       border-radius: 5px;word-break: break-word;text-decoration: none;box-shadow: 1px 1px 5px black"
    >${digitCode}</div>
    <p style="word-break: break-word;margin: 0 0 30px 0;text-align: center;">
      Digit-code expires in 3 minutes.
    </p>
    <i style="margin: 0 0 10px 100px;display: block">Regards</i>
    <strong style="margin: 0 0 0 100px">Team SeeMenu</strong>
  </div>`,

  Confirm: ({ firstName, lastName, activationCode }) => `
          <div style="width: 80%;height:100%;margin: 0 auto;color: black;">
             <div style="width: 100%;height: 80px;font-weight: bold;font-size: 50px;
                background: black;color: orangered;margin: 0 auto 50px;font-family: monospace;
                text-align: center;">SeeMenu</div>
             <h1 style="margin: 0 0 50px 0;text-align: center;">Welcome to our site</h1>
             <strong style="margin: 0 0 10px 100px">Hi ${firstName} ${lastName}</strong>
             <p style="word-break: break-word;margin: 0 0 50px 100px">
                To complete your account, please click the button below</p>
             <a style="width: 150px;padding: 8px 20px;background: green;font-weight: bold;
                text-align: center;color:white;margin: 0 auto 30px;display: block;
                border-radius: 5px;word-break: break-word;text-decoration: none;box-shadow: 1px 1px 5px black"
                href="${CONFIRM_URL + activationCode}">Choose your password</a>
             <p style="word-break: break-word;margin: 0 0 30px 0;text-align: center;">
                If you did not create an account using this address, please ignore this email.
             </p>
             <i style="margin: 0 0 10px 100px;display: block">Regards</i>
             <strong style="margin: 0 0 0 100px">Team SeeMenu</strong>
          </div>`,

  ResetPassword: ({ user, email, activationCode }) => `
           <div style="width: 80%;height:100%;margin: 0 auto;color: black;">
            <div style="width: 100%;height: 80px;font-weight: bold;font-size: 50px;text-align: center;
              background: black;color: orangered; margin-bottom: 20px;font-family: monospace;">SeeMenu</div>
            <h1 style="margin: 0 0 50px 0;text-align: center;">Welcome to our site</h1>
            <strong style="margin: 0 0 10px 100px">Hi ${user.firstName} ${user.lastName}</strong>
            <p style="word-break: break-word;margin: 0 0 50px 100px">
              You've recently asked to reset the password for this SeeMenu account:</p>
            <a href="mailto:${email}" style="display:block;word-break: break-word;text-align: center;
              margin: 0 0 30px 0">${email}</a>
            <p style="word-break: break-word;margin: 0 0 30px 0;text-align: center;">
              To update your password, click the button below:</p>
            <a style="width: 150px;padding: 8px 20px;background: #3572b0;font-weight: bold;
              text-align: center;color:white;margin: 0 auto 30px;display: block;
              border-radius: 5px;word-break: break-word;text-decoration: none;"
              href="${CONFIRM_URL + activationCode}">Confirm your Email</a>
            <i style="margin: 0 0 10px 100px;display: block">Regards</i>
            <strong style="margin: 0 0 0 100px">Team SeeMenu</strong>
           </div>`,

  Contact: ({
    name, email, themes, message,
  }) => `<div style="width: 80%;height:100%;margin: 0 auto;color: black;">
                    <div style="width: 100%;height: 80px;font-weight: bold;font-size: 50px;
                    background: black;color: orangered;margin: 0 auto 50px;font-family: monospace;
                    text-align: center;">SeeMenu</div>
                    <h1 style="margin: 0 0 50px 0;text-align: center;">Ուղարկող ${name}</h1>
                    <strong style="margin: 0 0 10px 100px">Թեման ${themes}</strong>
                     <p style="word-break: break-word;margin: 0 0 30px 0;text-align: center;">${message}</p>
                     <a style="width:30%;padding: 8px 20px;background: green;font-weight: bold;
                    text-align: center;color:white;margin: 0 auto 30px;display: block;
                    border-radius: 5px;text-decoration: none;box-shadow: 1px 1px 5px black"
                     href="mailto:${email.toLowerCase()}" title="${email.toLowerCase()}">
                     Պատասխանել՝  ${email.toLowerCase().slice(0, 30).concat('...')}</a>
                     <i style="margin: 0 0 10px 100px;display: block">Հարգանքներով</i>
                     <strong style="margin: 0 0 0 100px">Team SeeMenu</strong>
                </div>`,

};
