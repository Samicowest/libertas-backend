const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sendConfirmationEmail = async (email, token) => {
  const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
  const confirmationLink = `${serverUrl}/api/auth/confirm-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirm your email',
    html: `
      <h1>Email Confirmation</h1>
      <p>Please click the link below to confirm your email:</p>
      <a href="${confirmationLink}">${confirmationLink}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', email);
  } catch (err) {
    console.error('Error sending email:', err.message);
    if (err.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check your EMAIL_USER and EMAIL_PASS (App Password) in .env');
    }
    throw new Error('Failed to send confirmation email');
  }
};



const sendPasswordResetEmail = async (email, token) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5174';
  const resetLink = `${clientUrl}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password Request',
    html: `
      <h1>Password Reset</h1>
      <p>You requested a password reset. Please click the link below to verify your email and set a new password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
  } catch (err) {
    console.error('Error sending email:', err.message);
    if (err.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check your EMAIL_USER and EMAIL_PASS (App Password) in .env');
    }
    throw new Error('Failed to send password reset email');
  }
};

module.exports = { sendConfirmationEmail, sendPasswordResetEmail };
