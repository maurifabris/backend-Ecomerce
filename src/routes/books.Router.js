import { Router } from "express";
import passport from "passport";
import transporter from "../services/mailing.js";
import ContenedorMongo from "../daos/mongoose.js";
import config from "../config/dotenvConfig.js";
import ContenedorFS from "../daos/booksmanager.js";
import session from "express-session";

const router = Router();

let booksService
console.log(config.mongo.base)
let service = () =>{
    if (config.mongo.base == "FS") {
        return  new ContenedorFS()
    } 
    if (config.mongo.base == "MONGO") {
        return new ContenedorMongo()
    }
    }

booksService = service();


router.get('/ejemplo', async(req, res)=>{
    console.log("ejemplo")
    res.send(`peticion atendida por ${process.pid}`)
})

//route to register whit passport validation 

router.post('/',passport.authenticate('register', {failureRedirect:"/api/sessions/failedregister"}), async(req,res)=>{
    const user = req.user;
    res.send({status:"success", payload: user._id})
})

// Route to failed register
router.get('/failedregister',(req,res)=>{
    console.log("passport failed")
    res.status(500).send({status:"error", error:"error of passport"})
})

// to send mail

router.post('/mail', async(req,res)=>{
    console.log("ejecuta1")
    const result = await transporter.sendMail({
        from:"yo",
        to: "maurifabris91@gmail.com",
        subject: "Prueba",
        html:`<div><h1>esto es una prueba</h1></div>`
    })
    console.log(result)
    res.send({status:"success", message:result ,payload:result})
})

// to login
router.post('/login', passport.authenticate('login'),async(req,res)=>{
    req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        role: req.user.role
    }
    console.log(req.user.role)
    console.log(req.user.email)
    res.send({status:"success", message:"Logued"})
})
// profile info
router.get('/profile', async(req,res)=>{
    const user = req.session.user;
    console.log(user);
    if (user) {
      res.send({status:"success", user: user});
    } else {
      res.send({status:"error", error:"You need to log in."});
    }
  });


// rote to get all products
router.get("/all",async(req,res)=>{
    let products = await booksService.getAll()
    res.send({status:"success", payload:products})
})

router.post('/addBook', async (req, res) => {
    const book = req.body;
    const user = req.session.user;
    if(user.role != "admin"){
        throw new Error('Este es un mensaje de error');
    }
    if (book.name && book.autor && book.pages && book.price) {
        console.log(JSON.stringify(req.body));
        await booksService.save(book);
        res.send({status:"success", payload:book})
    }
  });

// delete by id
router.delete("/delete", async (req, res) => {

    const id = req.body.id;
    const result = await booksService.deleteById(id);
    console.log(`/////// ${id}`)
    res.json({ message: `Libro eliminado exitosamente ${req.session.user}` });
  });
  
  






export default router
