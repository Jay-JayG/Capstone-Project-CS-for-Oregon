import express from 'express';
import ObjectModel from '../models/objectModel.js';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newObject = {...req.body}; // '...req.body' obtains the body of the object reguardless of its content.

        const savedObject = await ObjectModel.collection.insertOne(newObject);
        res.status(201).json(savedObject);
    } catch (error) {
        console.error('Error uploading object:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const objects = await  ObjectModel.find({});
        res.status(200).json(objects);
    } catch (error) {
        console.log('Error getting objects', error)
        res.status(500).json({error: 'Internal server error'})
    }
});

export default router;