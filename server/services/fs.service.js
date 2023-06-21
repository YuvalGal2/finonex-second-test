// fs.js
import fs from 'fs';

const saveDataToFile = (data) => {
    const jsonData = JSON.stringify(data) + '\n';

    fs.appendFile('storage/data.jsonl', jsonData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Data appended to file successfully!');
        }
    });
};

export { saveDataToFile };