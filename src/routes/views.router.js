import { Router } from "express";
import Contenedor from "../../Contenedor.js";

const contenedor = new Contenedor()
const router = Router()

router.get('/',(req,res)=>{
    res.render('form')
})

router.get('/products',async (req,res)=>{
    const products = await contenedor.getAll();
    res.render('products', {
        products
    });
   
});

export default router