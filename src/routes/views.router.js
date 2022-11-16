import { Router } from "express";
import Contenedor from "../../Contenedor.js";

const productServices = new Contenedor()
const router = Router()

router.get('/',(req,res)=>{
    res.render('form')
})

router.get('/products',async (req,res)=>{
    const products = await productServices.getAll();
    res.render('products',{
        name:"Sol",
        products
    });
   
});

export default router