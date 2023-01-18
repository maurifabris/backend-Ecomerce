import mongoose from "mongoose";

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
        require: false
    }
})

const booksModels = mongoose.model(collection, schema);

export default booksModels;