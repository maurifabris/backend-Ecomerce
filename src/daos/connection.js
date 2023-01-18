import ContenedorFS from './booksmanager.js';
import ContenedorMongo from './mongoose.js';
import mongoose from 'mongoose';

// Cambiar el valor de la siguiente constante para utilizar el tipo de persistencia de datos deseado
const PERSISTENCIA = "FILESYSTEM" // Valores posibles: FILESYSTEM y MONGO

let Contenedor 

if (PERSISTENCIA === "FILESYSTEM") {
    Contenedor =  new ContenedorFS()
} else { // Se conecta a mongo
    const connection = mongoose.connect("mongodb+srv://prueba:123@cluster0.0v1r9fd.mongodb.net/products?retryWrites=true&w=majority", error => {
        if (error) {console.log(error);
        }else{ 
            console.log("Base conectada")
            Contenedor =   new ContenedorMongo()
        }
    })
}

export default Contenedor