import express from 'express'
import Contenedor from '../Contenedor.js'
import productRaouter from './routes/products.router.js'
import __dirname from './utils.js'

const contenedor = new Contenedor()
const app = express()

let list = []
app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.use('/api/producs', productRaouter);

app.listen(8080,()=>console.log('listen'))





// const server = app.listen(8080,()=>console.log("listen"))

// app.get("/",(req,res)=>{
//     res.send("hola")
// })

// app.get("/",async(req,res)=>{
//     contenedor.productoRamdom().then((Response)=>{
//         res.send(Response)
//         })
// })

// app.get('/productos',async(req,res)=>{
//     contenedor.getAll().then((Response)=>{
//         list.push(Response)
//         })
//       res.send(list)
// })