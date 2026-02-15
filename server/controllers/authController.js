const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendConfirmationEmail, sendPasswordResetEmail } = require('../utils/emailService');

// ... existing code ...

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not
      return res.status(200).json({ message: 'If a user with this email exists, a password reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await User.saveResetToken(email, token, expires);
    await sendPasswordResetEmail(email, token);

    res.status(200).json({ message: 'If a user with this email exists, a password reset link has been sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const user = await User.findByResetToken(token);
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.updatePassword(user.id, hashedPassword);

    res.status(200).json({ success: true, message: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const { ethers } = require('ethers');

// ... existing code ...

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) return res.status(400).json({ message: 'Email already in use' });

    const existingUsername = await User.findByUsername(username);
    if (existingUsername) return res.status(400).json({ message: 'Username already in use' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate confirmation token
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    // Generate Crypto Wallet
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const walletPrivateKey = wallet.privateKey;

    // Create user with wallet
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      confirmationToken,
      walletAddress,
      walletPrivateKey
    });

    // Send confirmation email
    await sendConfirmationEmail(email, confirmationToken);

    res.status(201).json({
      message: 'User registered successfully. Please check your email to confirm your account.',
      user: { id: newUser.id, username: newUser.username, email: newUser.email, walletAddress: newUser.wallet_address }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Something went wrong', error: String(err) });
  }
};

const confirmEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Token is required' });

    const user = await User.confirmEmail(token);
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Redirect to the client home page with a success indicator
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5175';
    res.redirect(`${clientUrl}/login?confirmed=true`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.is_confirmed) {
      return res.status(401).json({ message: 'Please confirm your email before logging in' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      result: { id: user.id, username: user.username, email: user.email, walletAddress: user.wallet_address },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { register, confirmEmail, login, forgotPassword, resetPassword };
