import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import gradesModel from "./models/gradesModel.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/postGrades", async (req, res) => {
    try {
        if (
            !req.body.student_id ||
            !req.body.scores ||
            !req.body.class_id
        )   {
                return res.status(400).send({ message: "Send all required files"});
            }

        const newGrade = {
            student_id: req.body.student_id,
            scores: req.body.scores,
            class_id: req.body.class_id
        };

        const grade = await gradesModel.create(newGrade);
        return res.status(201).send(grade);

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

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
