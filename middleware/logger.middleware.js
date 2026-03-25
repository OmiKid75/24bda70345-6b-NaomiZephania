import { sendToSolarWinds } from '../config/solarwinds.js';

export default function loggerMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration,
      timestamp: new Date().toISOString()
    };

    // print locally
    console.log(JSON.stringify(log));

    // optionally send
    sendToSolarWinds(log).catch(() => {});
  });

  next();
}
