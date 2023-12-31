// db.js
import pg from "pg";
const { Pool } = pg;
import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: resolve( '../.env') });
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

export default pool;