// utils/sendEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,      // your Gmail
    pass: process.env.EMAIL_PASS       // your App Password
  }
});

const sendConfirmationEmail = async (to, name, slot) => {
  const mailOptions = {
    from: `"AL Manar School" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Interview Slot Confirmation - AL Manar School",
    html: `
      <h3>Dear ${name},</h3>
      <p>Your admission interview has been successfully scheduled.</p>
      <p><strong>Time Slot:</strong> ${slot}</p>
      <p>We look forward to seeing you!</p>
      <br />
      <p>Regards,<br/>AL Manar School</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendConfirmationEmail;
