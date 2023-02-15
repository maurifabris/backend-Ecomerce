import { Router } from "express";
import Contenedor from "../daos/connection.js";
import passport from "passport";



const router = Router();
const booksService = Contenedor



router.post('/',passport.authenticate('register', {failureRedirect:"/api/sessions/failedregister"}), async(req,res)=>{
    const user = req.user;
    res.send({status:"success", payload: user._id})
})

router.get('/failedregister',(req,res)=>{
    console.log("passport failed")
    res.status(500).send({status:"error", error:"error of passport"})
})

router.post('/login', passport.authenticate('login'),async(req,res)=>{
    req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name
    }
    console.log(req.user.email)
    res.send({status:"success", message:"Logued"})
})

router.get('/profile', async(req,res)=>{
    req.user = {
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name
    }
    console.log(user)
})



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
