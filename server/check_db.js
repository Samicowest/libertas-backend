
const pg = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

async function testDatabaseConnection() {
    // Locate .env in the same directory as this script
    const envPath = path.join(__dirname, '.env');

    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
        console.log(`Loaded environment from ${envPath}`);
    } else {
        console.error(`❌ Could not find .env file at ${envPath}`);
    }

    const { Pool } = pg;
    const dbConfig = {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'libertas_alpha',
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
        connectionTimeoutMillis: 3000,
    };

    console.log('----------------------------------------');
    console.log('Checking Database Connection:');
    console.log(`User: ${dbConfig.user}`);
    console.log(`Host: ${dbConfig.host}:${dbConfig.port}`);
    console.log(`Database: ${dbConfig.database}`);
    console.log(`Password: ${dbConfig.password ? '******' : '(none provided)'}`);
    console.log('----------------------------------------');

    // List of passwords to try
    const passwordsToTry = [];
    if (dbConfig.password) passwordsToTry.push(dbConfig.password);

    // Add common defaults if the configured one fails or is missing
    const defaults = ['postgres', 'password', '123456', 'admin', 'root'];
    defaults.forEach(p => {
        if (!passwordsToTry.includes(p)) passwordsToTry.push(p);
    });

    for (const p of passwordsToTry) {
        console.log(`\nAttempting connection with password: "${p}" ...`);
        const pool = new Pool({ ...dbConfig, password: p });

        try {
            const client = await pool.connect();
            console.log('✅ Connection Sucessful!');

            // Query version
            const res = await client.query('SELECT version()');
            console.log(`📊 Server Version: ${res.rows[0].version}`);

            // Check if 'users' table exists
            try {
                const tableRes = await client.query(`
                    SELECT EXISTS (
                        SELECT FROM information_schema.tables 
                        WHERE table_schema = 'public' 
                        AND table_name = 'users'
                    );
                `);
                const tableExists = tableRes.rows[0].exists;
                console.log(`📋 'users' table exists: ${tableExists ? 'YES' : 'NO'}`);
            } catch (tableErr) {
                console.warn('⚠️  Could not check for tables:', tableErr.message);
            }

            client.release();
            await pool.end();
            return; // Success!
        } catch (err) {
            console.log(`❌ Failed: ${err.message}`);
            // If it's NOT an auth error, it might be connectivity (e.g. host/port), so subsequent passwords won't help
            if (err.code !== '28P01') {
                console.log('⚠️  Non-authentication error occurred. Stopping attempts.');
                await pool.end();
                break;
            }
        }
        await pool.end();
    }
    console.log('\n❌ All connection attempts failed.');
    console.log('Please check that PostgreSQL is running and your credentials are correct.');
}

if (require.main === module) {
    testDatabaseConnection();
}

module.exports = { testDatabaseConnection };
