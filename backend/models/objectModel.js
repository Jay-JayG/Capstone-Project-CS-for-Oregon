import mongoose from 'mongoose';

const ObjectModel = mongoose.model('Object', {}); // Empty object as schema

export default ObjectModel;

//Here's how you can associate an already existing collection with ObjectModel:
// const ObjectModel = mongoose.model('Object', new mongoose.Schema({}, { collection: 'yourExistingCollectionName' }));

