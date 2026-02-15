
const db = require('../config/db');

const addWalletColumns = async () => {
    try {
        console.log('Checking for wallet columns in users table...');

        const checkColumns = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name IN ('wallet_address', 'wallet_private_key');
    `;

        const { rows } = await db.query(checkColumns);
        const existingColumns = rows.map(r => r.column_name);

        if (!existingColumns.includes('wallet_address')) {
            console.log('Adding wallet_address column...');
            await db.query('ALTER TABLE users ADD COLUMN wallet_address VARCHAR(42) UNIQUE');
        }

        if (!existingColumns.includes('wallet_private_key')) {
            console.log('Adding wallet_private_key column...');
            await db.query('ALTER TABLE users ADD COLUMN wallet_private_key TEXT');
        }

        console.log('✅ Wallet columns migration completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
};

addWalletColumns();
