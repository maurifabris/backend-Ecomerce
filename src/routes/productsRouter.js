import { Router } from "express";
import Contenedor from "../../Contenedor.js";
import uploader from "../services/upload.js";

const router = Router()
const contenedor = new Contenedor()
router.post('/',uploader.single('images') ,async(req,res)=>{
    console.log(req.file);
    let product = req.body;
    const resultado  = await contenedor.save(product)
    res.send(resultado)
    console.log(req.body)
})

router.get('/',async(req,res)=>{
    let result = await contenedor.get();
    res.send(result);
})
export default router