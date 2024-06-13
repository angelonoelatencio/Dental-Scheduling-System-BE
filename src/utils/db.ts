import mysql from "mysql2/promise";
import dotenv from "dotenv";
import config from "../config";

dotenv.config();

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.database,
  port: +config.mysql.port,
});

export default pool;
