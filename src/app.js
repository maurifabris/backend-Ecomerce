import express from 'express'
import Contenedor from '../Contenedor.js'
const contenedor = new Contenedor()
const app = express()

let list = []

const server = app.listen(8080,()=>console.log("listen"))

app.get("/",(req,res)=>{
    res.send("hola")
})

app.get("/productoRamdom",async(req,res)=>{
    contenedor.productoRamdom().then((Response)=>{
        res.send(Response)
        })
})

app.get('/productos',async(req,res)=>{
    contenedor.getAll().then((Response)=>{
        list.push(Response)
        })
      res.send(list)
})