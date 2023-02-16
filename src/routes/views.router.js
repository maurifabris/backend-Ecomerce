import { Router } from "express";
import Contenedor from "../../Contenedor.js";
import { ExpressHandlebars } from "express-handlebars";
import session from "express-session";

const productServices = new Contenedor()
const routerViews = Router()

routerViews.get('/book',(req,res)=>{
    res.render('form')
})

routerViews.get('/login',(req,res)=>{
    res.render('login')
})

routerViews.get('/products',async (req,res)=>{
    let products = await productServices.getAll();
    res.render('products',{
        products
    });
   
});

routerViews.get("/",(req,res)=>{
    res.render("register")
})

routerViews.get('/profile',(req,res)=>{
    if(user){    res.render('profile',{user:req.session.user})
    } else {
        res.send({status:"error", error:"You need log"})
}
})


export default routerViews