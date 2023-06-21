import {validateRequestData} from './middlewares/validationMiddleware.js';
import { validateAuthorization } from './middlewares/authMiddleware.js';
import { saveDataToFile } from './services/fs.service.js';
import * as dotenv from 'dotenv'
const app = express();
import express from 'express';
import bodyParser from 'body-parser';

app.use(bodyParser.json());
dotenv.config()

app.get('/userEvents/:userId', (req, res) => {
        const userId = req.params.userId;
        return res.send(`Received a GET HTTP method with userId: ${userId}`);
});
app.post('/liveEvent', validateAuthorization, (req, res, next) => {
    validateRequestData(req, res, () => {
        const requestData = req.body;
        saveDataToFile(requestData);
        return res.json({ message: 'Data has been saved' });
    });
});



app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
    console.log(`app listening on port ${process.env.PORT}!`);
});