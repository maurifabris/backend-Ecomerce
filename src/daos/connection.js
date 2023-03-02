import ContenedorFS from './booksmanager.js';
import ContenedorMongo from './mongoose.js';
import mongoose from 'mongoose';

// Cambiar el valor de la siguiente constante para utilizar el tipo de persistencia de datos deseado
let Contenedor
const persistence = "FILESYSTEM"


if (persistence === "FILESYSTEM") {
    if (typeof ContenedorFS === "function") {
      Contenedor = new ContenedorFS();
    } else {
      console.error("ContenedorFS no es un constructor válido");
    }
  } else { // Se conecta a mongo
    if (typeof ContenedorMongo === "function") {
      const connection = mongoose.connect("mongodb+srv://prueba:123@cluster0.0v1r9fd.mongodb.net/products?retryWrites=true&w=majority")
      Contenedor = new ContenedorMongo();
    } else {
      console.error("ContenedorMongo no es un constructor válido");
    }
  }

  export default Contenedor