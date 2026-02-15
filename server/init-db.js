const db = require('./config/db');

const initDb = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_confirmed BOOLEAN DEFAULT FALSE,
      confirmation_token VARCHAR(255),
      reset_password_token VARCHAR(255),
      reset_password_expires TIMESTAMP,
      wallet_address VARCHAR(42) UNIQUE,
      wallet_private_key TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(createUsersTable);
    console.log('✅ Users table initialized successfully');
  } catch (err) {
    console.error('❌ Error creating users table:', err);
    throw err;
  }
};

if (require.main === module) {
  initDb()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = initDb;
