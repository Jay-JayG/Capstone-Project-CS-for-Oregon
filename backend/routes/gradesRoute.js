import express from 'express';
import gradesModel from '../models/gradesModel.js';

const router = express.Router();

//Get one item by id
router.get('/:id', async (req, res) => {
    try {
        
        const { id } = req.params;

        const grade = await gradesModel.findById(id)

        if (!grade) {
            return res.statusCode(404).json({ message : 'Grade not found' });
        }

        return res.status(200).json({grade});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
    }
});
//Update one item by id
router.put('/:id', async (req, res) => {
    try {

        console.log('Received Request Body:', req.body);

        const { id } = req.params;

        if (
            !req.body.student_id ||
            !req.body.scores ||
            !req.body.class_id
        ) {
            return res.status(400).send({ message: "Send all required fields" });
        }

        // { new: true } This option ensures that the updated document is returned after the updating document.
        const result = await gradesModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Grade not found' });
        }

        return res.status(200).send({ message: 'Grade Updated Successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});
//Get all items meeting criteria 
router.get('/', async (req, res) => {
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
//Create and post item to database
router.post('/', async (req, res) => {
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
//Delete item fro database
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await gradesModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Item not found'});
        }

        return res.status(200).send({ message: 'Item deleted successfully'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;