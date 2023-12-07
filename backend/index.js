import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import gradesRoute from './routes/gradesRoute.js';
//import gradesModel from './models/gradesModel.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/grades', gradesRoute);
app.use('*', (req, res) => res.status(404).json({ error: 'not found'}));

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
