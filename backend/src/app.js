// =============================================
// APPLICATION ENTRY POINT
// =============================================
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config, validateConfig } from './config/index.js';
import router from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Validate environment on startup
validateConfig();

const app = express();

// ---- Security Middleware ----
app.use(helmet());
app.use(
  cors({
    origin: config.cors.frontendUrl,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ---- Rate Limiting ----
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please slow down.' },
});
app.use('/api', limiter);

// ---- Request Parsing ----
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ---- Logging ----
app.use(morgan(config.server.isDev ? 'dev' : 'combined'));

// ---- Routes ----
app.use('/api', router);

// ---- Error Handling ----
app.use(notFoundHandler);
app.use(errorHandler);

// ---- Server Start ----
app.listen(config.server.port, () => {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║    PHISHING SIMULATOR - BACKEND ONLINE     ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║  Port    : ${config.server.port}                             ║`);
  console.log(`║  Mode    : ${config.server.nodeEnv.padEnd(32)}║`);
  console.log(`║  AI      : Google Gemini                   ║`);
  console.log(`║  Model   : ${config.ai.geminiModel.padEnd(32)}║`);
  console.log('╚════════════════════════════════════════════╝\n');
});

export default app;
