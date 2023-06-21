import pool from '../db/db.js';
import dotenv from "dotenv";
async function getUserData(userId) {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${process.env.DB_TABLE} where user_Id = '${userId}'`);
        client.release();
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

async function insertUserData(userId, value) {
    const insertQuery = `INSERT INTO ${process.env.DB_TABLE} (user_id, revenue) VALUES ('${userId}',${value})`;
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client:', err);
            return;
        }
        client.query(insertQuery, (error) => {
            console.log(insertQuery);
        });
    });
}

async function updateUserData(userId, value, preFetchedData) {
    let valueToUpdate = value;
    if (preFetchedData.revenue) {
        valueToUpdate = value + preFetchedData.revenue;
        console.log(valueToUpdate);
    }
    const updateQuery = `update ${process.env.DB_TABLE} set revenue = ${valueToUpdate} where user_id = '${userId}'`;
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client:', err);
            return;
        }
        client.query(updateQuery, (error) => {
            console.log(updateQuery);
        });
    });
}

export {getUserData, updateUserData, insertUserData };