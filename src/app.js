import express from 'express'
import viewsRouter from "./routes/views.router.js"
import __dirname from './utils.js'
import handlebars from 'express-handlebars';
import booksRouter from "./routes/books.Router.js"


const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> console.log(`Listen ${PORT}`))


app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+"/views")
app.set('view engine', 'handlebars')


app.use(express.static(__dirname+'/public'))
app.use(express.json())
//app.use(express.urlencoded({express:true}))


app.use("/",booksRouter)
app.use("/",viewsRouter)




