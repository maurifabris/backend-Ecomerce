import { Router } from "express";
import Contenedor from "../../Contenedor.js";
import uploader from "../services/upload.js";

const router = Router()
const contenedor = new Contenedor()

router.post('/',async(req,res)=>{
    const {name,autor,price,pages} = req.body;
    const products = {
        name,
        autor,
        price,
        pages
    }
    let result = await contenedor.save(products);
    res.send({status:"success",payload:result})
})
router.get('/items/:id', async (request, response) => {
    const id = request.params.id
    let result = await contenedor.getById(id)
    response.send(result)
})


router.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.render("products", products)
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