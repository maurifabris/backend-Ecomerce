import mongoose from "mongoose";


// this file is for create a model to save data in mongoose


const collection = 'products';
const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

const booksModels = mongoose.model(collection, schema);

export default booksModels;