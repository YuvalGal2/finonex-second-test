import fs from 'fs';
import readline from 'readline';
import pool from '../db/db.js';
import {getUserData, insertUserData, updateUserData} from "../services/db.service.js";
// reads line by line.
// reads until it's founding \n
const lineReader = readline.createInterface({
    input: fs.createReadStream('../storage/data.jsonl'),
    crlfDelay: Infinity,
});
const userRevenueMap = new Map();
lineReader.on('line', (line) => {
    try {
        const eventData = JSON.parse(line);
        const { userId, name, value } = eventData;
        let finalValue = 0;
        switch (name) {
            case "add_revenue":
                finalValue = value;
                break;
            case "subtract_revenue":
                if (value > 0 ){
                    finalValue = value * -1
                }
                else {
                    finalValue = value;
                }
                break;
            default:
                return;
            break;
        }
        if (!userRevenueMap.has(userId)) {
            // if the user has no revenue defined, default it to 0.
            userRevenueMap.set(userId, 0);
        }
        // otherwise get the previously defined userid from the map and add the current value.
        userRevenueMap.set(userId, userRevenueMap.get(userId) + finalValue);
    } catch (error) {
        console.error('Error parsing line:', error);
    }
});
lineReader.on('close', () => {
    const entries = Array.from(userRevenueMap.entries());
    entries.forEach( async  (user) => {
        let res = await getUserData(String(user[0]));
        if (res.rowCount === 1 ) {
            res = res.rows[0];
            await updateUserData(user[0], user[1], res);
        }
        else {
            await insertUserData(user[0],user[1]);
        }
    })

    // might want to add function to delete the file after all opreations are done....
});

