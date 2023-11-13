import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import gradesModel from "./models/gradesModel.js";
import cors from "cors";

const app = express();

app.use(cors());

app.get('/getGrades', async (req, res) => {
    try {
        console.log("Hello World!");
        const result = await gradesModel.find({
            'scores': {
                $elemMatch: {
                    'type': 'exam',
                    'score': { $gt: 95 }
                }
            }
        });
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

app.post("/grades", (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

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
