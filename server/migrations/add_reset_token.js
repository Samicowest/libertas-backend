
const db = require('../config/db');

const fastForward = async () => {
    try {
        console.log('Checking for reset password columns...');

        // Check if columns exist
        const checkColumns = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name IN ('reset_password_token', 'reset_password_expires');
    `;

        const { rows } = await db.query(checkColumns);
        const existingColumns = rows.map(r => r.column_name);

        if (!existingColumns.includes('reset_password_token')) {
            console.log('Adding reset_password_token column...');
            await db.query('ALTER TABLE users ADD COLUMN reset_password_token VARCHAR(255)');
        }

        if (!existingColumns.includes('reset_password_expires')) {
            console.log('Adding reset_password_expires column...');
            await db.query('ALTER TABLE users ADD COLUMN reset_password_expires TIMESTAMP');
        }

        console.log('✅ Migration completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
};

fastForward();
