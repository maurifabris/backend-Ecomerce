
import { Router } from "express";
import Contenedor from "../daos/connection.js";
    
const router = Router();
const booksService = Contenedor

router.get("/products",async(req,res)=>{
    let products = await booksService.getAll()
    res.send({status:"success", payload:products})
})

router.get("/:bid", async(req,res)=>{
    const {bid} = req.params;
    const id = parseInt(bid)
    let product = await booksService.getById(id)
    res.send({status:"success", payload:product})
})

router.post("/", async(req,res)=>{
    const   {name,autor,price, pages} = req.body
    const book = {
        name,
        autor,
        price,
        pages
    }
   await booksService.save(book)
    res.send({status:"success", message:"book added"})
})

router.delete("/:bid", async(req,res)=>{
    const {bid} = req.params;
    const id = parseInt(bid)
    let product = await booksService.deleteById(id)
    res.send({status:"success", payload:product})
})


export default router
