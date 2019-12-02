const winston = require('winston');


/** @typedef {DeployLogger}
 * @extends {winston.Logger}
 * @property {function} log
 */


/** @type {Logger} Singleton logger */
let singletonLogger;


class Logger {
  constructor() {
    // this.logger;
    this.levels = Object.freeze({
      INFO: 'info',
      WARN: 'warn',
      ERROR: 'error',
      SILLY: 'silly',
      VERBOSE: 'verbose',
      DEBUG: 'debug',
    });

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
      ],
    });

    this.info = (...messages) => this.log(this.levels.INFO, ...messages);
    this.warn = (...messages) => this.log(this.levels.WARN, ...messages);
    this.error = (...messages) => this.log(this.levels.ERROR, ...messages);
    this.silly = (...messages) => this.log(this.levels.SILLY, ...messages);
    this.verbose = (...messages) => this.log(this.levels.VERBOSE, ...messages);
    this.debug = (...messages) => this.log(this.levels.DEBUG, ...messages);
  }

  /**
   * Given a level & n number of messages - log them all.
   * @param {string} level Valid winston log level
   * @param  {...any} messages N number of messages to log at the given level
   * @void
   */
  log(level, ...messages) {
    messages.forEach((msg) => this.logger[level](msg));
  }
}


/**
 * Getter for the singleton logger.
 * @note If the logger has not been initialized this call will do so.
 * @returns {Logger} Singleton logger
 */
function getLogger() {
  if (!singletonLogger) {
    singletonLogger = new Logger();
  }
  return singletonLogger;
}

module.exports = {
  getLogger,
};
