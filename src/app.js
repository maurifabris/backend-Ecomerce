import express from 'express'
import productsRouter from './routes/products.Router.js'
import viewsRouter from "./routes/views.router.js"
import __dirname from './utils.js'
import handlebars from 'express-handlebars';


const app = express()


app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+"/views")
app.set('view engine', 'handlebars')


app.use(express.static(__dirname+'/public'))
app.use(express.json())

app.use('/api/products', productsRouter);
app.use("/",viewsRouter)


app.listen(8080,()=>console.log('listen'))

