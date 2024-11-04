import express from 'express';
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cron from 'node-cron';
import { kvController } from './controller/kvController.js';
import implementTimeToLeave from './cron.js';

const jsonParser = bodyParser.json();

dotenv.config();

const app = express();
const port = 8080;

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
        logging: false
    }
);

app.get('/getdata/:id', jsonParser, kvController.getData);
app.post('/addData', jsonParser, kvController.addData);
app.delete('/deleteData/:id', jsonParser, kvController.deleteData);


// Schedule the stored procedure to run every ten minutes
cron.schedule('10 * * * *', () => {
    console.log('Executing TTL');
    implementTimeToLeave();
}, {
    scheduled: true,
    timezone: "UTC"
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});