const {
  emailId,
  emailPass,
  emailServer,
  emailServerPort,
  storeName,
} = require("../config/keys");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: emailServer,
  port: emailServerPort,
  secure: true,
  auth: {
    user: emailId,
    pass: emailPass,
  },
});

let sendEmail = async (email, subject, html) => {
  let info = await transporter.sendMail({
    from: `"${storeName}" <${emailId}>`,
    to: email,
    subject: subject,
    text: "",
    html: html,
  });
  console.log(info.messageId);
};

module.exports = {
  sendEmail,
};
