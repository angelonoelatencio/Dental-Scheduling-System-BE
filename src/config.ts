import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * @constant {string} MYSQL_HOST - The host address of the MySQL database.
 * @default "localhost"
 */
const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";

/**
 * @constant {string} MYSQL_DATABASE - The name of the MySQL database.
 * @default "dental_office"
 */
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "dental_office";

/**
 * @constant {string} MYSQL_USER - The username for connecting to the MySQL database.
 * @default "root"
 */
const MYSQL_USER = process.env.MYSQL_USER || "root";

/**
 * @constant {string} MYSQL_PASS - The password for connecting to the MySQL database.
 * @default "nothing"
 */
const MYSQL_PASS = process.env.MYSQL_PASS || "nothing";

/**
 * @constant {number} MYSQL_PASS - The password for connecting to the MySQL database.
 * @default 3307
 */
const MYSQL_PORT = process.env.MYSQL_PORT || 3307;

/**
 * MySQL configuration object
 * @typedef {Object} MYSQLConfig
 * @property {string} host - The host address of the MySQL database.
 * @property {string} database - The name of the MySQL database.
 * @property {string} user - The username for connecting to the MySQL database.
 * @property {string} pass - The password for connecting to the MySQL database.
 * @property {number} port - The password for connecting to the MySQL database.

 */

/** @type {MYSQLConfig} */
const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  pass: MYSQL_PASS,
  port: MYSQL_PORT,
};

/**
 * @constant {string} SERVER_HOSTNAME - The hostname for the server.
 * @default "localhost"
 */
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";

/**
 * @constant {number} SERVER_PORT - The port number for the server.
 * @default 8888
 */
const SERVER_PORT = process.env.SERVER_PORT || 3000;

/**
 * @constant {number} SERVER_TOKEN_EXPIRETIME - The token expiration time in seconds.
 * @default 3600
 */
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;

/**
 * @constant {string} SERVER_TOKEN_ISSUER - The issuer of the token.
 * @default "noelIsTheIssuer"
 */
const SERVER_TOKEN_ISSUER =
  process.env.SERVER_TOKEN_ISSUER || "NoelIsTheSecret";

/**
 * @constant {string} SERVER_TOKEN_SECRET - The secret key for the token.
 * @default "nothingissecret"
 */
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "nothingissecret";

/**
 * Server configuration object
 * @typedef {Object} ServerConfig
 * @property {string} hostname - The hostname for the server.
 * @property {number} port - The port number for the server.
 * @property {Object} token - The token configuration object.
 * @property {number} token.expireTime - The token expiration time in seconds.
 * @property {string} token.issuer - The issuer of the token.
 * @property {string} token.secret - The secret key for the token.
 */

/** @type {ServerConfig} */
const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

/**
 * Configuration object
 * @typedef {Object} Config
 * @property {MYSQLConfig} mysql - MySQL configuration.
 * @property {ServerConfig} server - Server configuration.
 */

/** @type {Config} */
const config = {
  mysql: MYSQL,
  server: SERVER,
};

// Exporting the configuration object for use in other parts of the application
export default config;
