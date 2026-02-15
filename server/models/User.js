const db = require('../config/db');

class User {
  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  static async create({ username, email, password, confirmationToken, walletAddress, walletPrivateKey }) {
    const result = await db.query(
      'INSERT INTO users (username, email, password, confirmation_token, wallet_address, wallet_private_key) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, wallet_address',
      [username, email, password, confirmationToken, walletAddress, walletPrivateKey]
    );
    return result.rows[0];
  }

  static async confirmEmail(token) {
    const result = await db.query(
      'UPDATE users SET is_confirmed = TRUE, confirmation_token = NULL WHERE confirmation_token = $1 RETURNING id',
      [token]
    );
    return result.rows[0];
  }

  static async saveResetToken(email, token, expires) {
    const result = await db.query(
      'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3 RETURNING id',
      [token, expires, email]
    );
    return result.rows[0];
  }

  static async findByResetToken(token) {
    const result = await db.query(
      'SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()',
      [token]
    );
    return result.rows[0];
  }

  static async updatePassword(userId, hashedPassword) {
    const result = await db.query(
      'UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2 RETURNING id',
      [hashedPassword, userId]
    );
    return result.rows[0];
  }
}

module.exports = User;
