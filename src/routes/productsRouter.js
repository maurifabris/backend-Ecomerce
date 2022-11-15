import { Router } from "express";
import Contenedor from "../../Contenedor.js";
import uploader from "../services/upload.js";

const router = Router()
const contenedor = new Contenedor()

router.post('/',uploader.single('images') ,async(req,res)=>{
    console.log(req.file);
    let product = req.body;
    const result  = await contenedor.save(product)
    res.send(result)
    console.log(req.body)
})

router.get('/items/:id', async (request, response) => {
    const id = request.params.id
    let result = await contenedor.getById(id)
    response.send(result)
})


router.get('/products', async (req, res) => {
    const products = await contenedor.getAll();
    res.send({products})
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id
    let result = await contenedor.deleteById(id)
    response.send(result)
})

router.put('/:id', async (request, response) => {
    const id = request.params.id
    const productBody = request.body

    let result = await contenedor.updateItem(productBody, id)
    response.send(result)
})


export default router