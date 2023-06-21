import axios from 'axios';

async function sendLiveEventRequest(userId, name, value) {
    try {
        const payload = {
            userId: userId,
            name: name,
            value: value,
        };

        const headers = {
            Authorization: 'secret',
        };

        const response = await axios.post('http://localhost:8000/liveEvent', payload, {
            headers: headers,
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}


const userId = process.argv[2];
const name = process.argv[3];
const value = parseInt(process.argv[4]);
// code reviewer - if you want i can add await on global scope (if you are using latest node versions)
sendLiveEventRequest(userId, name, value);