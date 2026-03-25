import { StatusCodes } from 'http-status-codes';

export default function errorMiddleware(err, req, res, next) {
  const status = err.statusCode || err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  const payload = {
    success: false,
    message
  };

  if (process.env.NODE_ENV === 'development') {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}
