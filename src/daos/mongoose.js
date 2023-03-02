import mongoose from "mongoose"
import booksModel from "../models/models.js"
import config from "../config/dotenvConfig.js";


mongoose.set('strictQuery',false);

console.log(`${config.mongo.password}//////////////////`)

const connection = mongoose.connect(`mongodb+srv://prueba:${config.mongo.password}@cluster0.0v1r9fd.mongodb.net/products?retryWrites=true&w=majority`, err =>{
    if(err){console.log(err)
    } else {
        console.log("Connected to mongo :D")
    }
})


class ContenedorMongo {
    constructor(){ 
        // this will save a product
        this.save = async (book) => {
            try {
              const insertToCreate = await booksModel.create(book);
            } catch (error) {
              console.error(error);
            }
          };
          
    // this is for save meny products
    this.insertMany = async() => {
        let insertados = await booksModel.insertMany(booksToInsert)
        console.log(insertados)
    } 
    // return all products
    this.getAll =async()=>{
        let products = await booksModel.find({})
        console.log(products)
    }
    this.getById =async(id)=>{
        let products = await booksModel.find(id)
        console.log(products)
    }
    // delete many products
    this.deleteMany = async(prod)=> {
        let howToDelete = await booksModel.deleteOne(prod)
        console.log(howToDelete)
    }
    // delete products by id
    this.deleteById = async(id)=>{
        let howToDelete = await booksModel.deleteOne({ _id: id })
        console.log(howToDelete)
    }
    // update a product
    this.update = async(productUpdate, id) => { 
        await this.booksModel.updateOne({_id: id}, {$set: {...productUpdate}})
        console.log(productUpdate)
    }

}
}

export default ContenedorMongo
