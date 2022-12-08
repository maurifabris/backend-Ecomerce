import { Router } from "express";
import Contenedor from "../../Contenedor.js";
import { ExpressHandlebars } from "express-handlebars";

const productServices = new Contenedor()
const router = Router()

router.get('/',(req,res)=>{
    res.render('form')
})

router.get('/products',async (req,res)=>{
    let products = await productServices.getAll();
    res.render('products',{
        products
    });
   
});

export default router