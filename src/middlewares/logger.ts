import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const errorsTransport = new winston.transports.DailyRotateFile({
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d'
});

const transport = new winston.transports.DailyRotateFile({
  filename: 'request-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d'
});

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    transport
  ]
});

const errorLogger = expressWinston.errorLogger({
  transports: [errorsTransport]
});

export { requestLogger, errorLogger };
