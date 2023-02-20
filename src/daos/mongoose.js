import mongoose from "mongoose"
import booksModel from "../models/models.js"
import config2 from "../config/dotenvConfig.js";


mongoose.set('strictQuery',false);

console.log(config2)


const connection = mongoose.connect(`mongodb+srv://prueba:${config2.mongo.password}@cluster0.0v1r9fd.mongodb.net/products?retryWrites=true&w=majority`, err =>{
    if(err){console.log(err)
    } else {
        console.log("Connected :D")
    }
})

const booksToInsert = [
    {name:"El Nombre Del Viento", price:4000, stock:50},
    {name:"El Temos De Un Hombre Sabio", price:4000, stock:100}
]

class ContenedorMongo {
    constructor(){ 
    const save = async({prod}) =>{
        let insertToCreate = await booksModel.createOne({prod})
        console.log(prod)
    }
    const insertMany = async() => {
        let insertados = await booksModel.insertMany(booksToInsert)
        console.log(insertados)
    } 
    const getAll =async()=>{
        let products = await booksModel.find({})
        console.log(products)
    }
    const deleteMany = async(prod)=> {
        let howToDelete = await booksModel.deleteOne(prod)
        console.log(howToDelete)
    }
    const deleteById = async(prod)=>{
        let howToDelete = await booksModel.deleteOne(prod)
        console.log(prod)
    }
    const update = async(productUpdate, id) => { 
        await this.booksModel.updateOne({_id: id}, {$set: {...productUpdate}})
        console.log(productUpdate)
    }

}
}

export default ContenedorMongo
