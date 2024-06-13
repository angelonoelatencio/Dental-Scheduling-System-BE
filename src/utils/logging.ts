/**
 * Logs an informational message.
 *
 * @param {string} namespace - The namespace of the log message.
 * @param {string} message - The log message.
 * @param {any} [object] - Optional additional object to log.
 */
const info = (namespace: any, message: any, object?: any) => {
  if (object) {
    console.info(
      `[${getTimeStamp()}] [INFO] [${namespace}] ${message}`,
      object
    );
  } else {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
  }
};

/**
 * Logs a warning message.
 *
 * @param {string} namespace - The namespace of the log message.
 * @param {string} message - The log message.
 * @param {any} [object] - Optional additional object to log.
 */
const warn = (namespace: any, message: any, object?: any) => {
  if (object) {
    console.warn(
      `[${getTimeStamp()}] [WARN] [${namespace}] ${message}`,
      object
    );
  } else {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

/**
 * Logs an error message.
 *
 * @param {string} namespace - The namespace of the log message.
 * @param {string} message - The log message.
 * @param {any} [object] - Optional additional object to log.
 */
const error = (namespace: any, message: any, object?: any) => {
  if (object) {
    console.error(
      `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
      object
    );
  } else {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
  }
};

/**
 * Logs a debug message.
 *
 * @param {string} namespace - The namespace of the log message.
 * @param {string} message - The log message.
 * @param {any} [object] - Optional additional object to log.
 */
const debug = (namespace: any, message: any, object?: any) => {
  if (object) {
    console.debug(
      `[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
      object
    );
  } else {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
  }
};

/**
 * Gets the current timestamp in ISO format.
 *
 * @returns {string} The current timestamp.
 */
const getTimeStamp = () => {
  return new Date().toISOString();
};

// Exporting the logging functions for use in other parts of the application
export default {
  info,
  warn,
  error,
  debug,
};
