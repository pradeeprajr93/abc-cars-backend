const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
var configData = require("./config/connection");

configData.getConnectionInfo().then(
  (dbConnection) => {
    let server;
    mongoose.connect(dbConnection.DATABASE_URL, config.mongoose.options).then(() => {
      logger.info('Connected to MongoDB');
      server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
      });
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          logger.info('Server closed');
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error) => {
      logger.error(error);
      exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
      logger.info('SIGTERM received');
      if (server) {
        server.close();
      }
    });
  }
);
