import express from 'express'
import routerViews from "./routes/views.router.js"
import __dirname from './utils.js'
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import Booksrouter from './routes/books.Router.js';
import session from 'express-session';
import store from "session-file-store"
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passportConfig.js';
import { config } from 'dotenv';
import configdotenv from "./config/dotenvConfig.js"
import bodyParser from 'body-parser'



const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> console.log(`Listen ${PORT}`))
const fileStore = store(session)


app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+"/views")
app.set('view engine', 'handlebars')

// ---- middlewares ----
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://prueba:123@cluster0.0v1r9fd.mongodb.net/basesessions?retryWrites=true&w=majority',
        ttl: 50000000,
        collection: 'sessions'
    }),
    secret:'sessionEcommerce',
    resave:false,
    saveUninitialized:false
}))
initializePassport()
app.use(passport.initialize());
app.use(passport.session())

// routers

app.use("/api/",Booksrouter)
app.use("/",routerViews)




console.log(configdotenv.mongo.password)
console.log(process.argv)