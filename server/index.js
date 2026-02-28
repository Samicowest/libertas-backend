const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const initDb = require('./init-db');

const app = express();

// CORS — allow requests from the deployed frontend URL (set CLIENT_URL in Render env vars)
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl / Postman / server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} is not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());

// Health-check endpoint — Render pings this to verify the service is alive
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Authentication Server is running');
});

// ─── 404 — any route not matched above ───────────────────────────────────────
// Returns JSON so the client never gets an HTML 404 page.
app.use((req, res) => {
  console.warn(`[404] ${req.method} ${req.originalUrl} — route not found`);
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ─── Global error handler ─────────────────────────────────────────────────────
// Must have 4 arguments so Express recognises it as an error handler.
// Always returns JSON, preventing Express from sending an HTML error page
// (which is what causes "Unexpected token '<'" on the client).
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  console.error(`[Error] ${req.method} ${req.originalUrl}`, err);
  res.status(status).json({
    message: err.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
};

startServer();
