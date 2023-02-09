
import { Router } from "express";
import Contenedor from "../daos/connection.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import userModel from "../models/userModel.js";

const router = Router();
const booksService = Contenedor

router.get('/pr', async(req,res)=>{
    req.session.user = {
        name:"mauri"
    }
    res.send("hola")
})

router.post('/',async(req,res)=>{
    const {first_name,last_name,email,password} = req.body;
    if(!first_name || !last_name || !email || !password) return res.status(400).send({status:"error",error:"valores incorrectos"})
    const exist = await userModel.findOne({email});
    if(exist) return res.status(400).send({status:"error",error:"el usuario ya existe"})
    const user = {
        first_name,
        last_name,
        email,
        password
    }
    const result = await userModel.create(user)
    res.send({status:"success",payload:result._id})
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).send({status:error, error:"faltan datos"})
    const user = await userModel.findOne({email, password})
    if(!user) return  res.status(400).send({status:"error", error:"el ususario no existe"}) 
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        role: user.role,
        email: user.email
    }
    res.send({status:"success", message:"logueado"})
})


// router.get('/',(req,res)=>{
//     const { email , password } = req.body
//     if(email === "correo@gmail.com" && password === "123"){
//         const user = {
//             name:"mauri",
//             last_name:"fabris",
//             email:"correo@gmail.com",
//             role:"client",
//             password
//         }
//         req.session.user = {
//             name: `${user.name} ${user.last_name}`,
//             role:"client"
//         }
//         res.send({status:"success", message:"salio bien"})
//     } else {
//     res.send({status:"error", message:"contraseña incorrecta"})
//     }
// })

router.get("/all",async(req,res)=>{
    let products = await booksService.getAll()
    res.send({status:"success", payload:products})
})

router.get("/:bid", async(req,res)=>{
    const {bid} = req.params;
    const id = parseInt(bid)
    let product = await booksService.getById(id)
    res.send({status:"success", payload:product})
})

router.post("/book", async(req,res)=>{
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
