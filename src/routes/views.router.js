import { Router } from "express";
import { ExpressHandlebars } from "express-handlebars";
import session from "express-session";
import { service } from "./books.Router.js";


const booksService = service()
const routerViews = Router()

// views routes

routerViews.get('/all', async (req, res) => {
    const products = await booksService.getAll();
    res.render('products', { products });
  });

routerViews.get('/addBook',(req,res)=>{
    res.render('form')
})

routerViews.get('/delete',(req,res)=>{
    res.render('formDelete')
})

routerViews.get('/login',(req,res)=>{
    res.render('login')
})

routerViews.get('/products',async (req,res)=>{
    let products = await booksService.getAll();
    res.render('products',{
        products
    });
   
});

routerViews.get("/",(req,res)=>{
    res.render("register")
})
// el profile y user solo funciona en production
routerViews.get('/profile',(req,res)=>{
    if(req.session.user){res.render('profile',{user:req.session.user})
    } else {
        res.send({status:"error", error:"You need log"})
}
})


export default routerViews