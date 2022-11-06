import express from 'express'
import productsRouter from './routes/productsRouter.js'
import __dirname from './utils.js'


const app = express()

let list = []
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use('/api/products', productsRouter);

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