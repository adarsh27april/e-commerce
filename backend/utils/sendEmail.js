const nodemailer = require("nodemailer")

const sendEmail = async (options) => {

   const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
         user: process.env.SMPT_MAIL,
         pass: process.env.SMTP_PASSWORD
      }
   })
   const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message
   }

   let a = await transporter.sendMail(mailOptions);
   // console.log(a);
}

module.exports = sendEmail
