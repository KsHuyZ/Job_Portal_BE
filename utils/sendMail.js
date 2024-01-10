const nodemailer = require("nodemailer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");
const mailConfig = require("../config/mail");
require("dotenv/config");

exports.sendMail = (to, subject, htmlContent, text) => {
  const transport = nodemailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
    text: text,
  };
  return transport.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
