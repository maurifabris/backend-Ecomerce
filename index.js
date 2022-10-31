import Contenedor from "./Contenedor.js"
const contenedor = new Contenedor()

let JuegoDeTronos={
    name: "Juego De Tronos",
    price: 50,
    autor: "George R.R Martin",
    pages:800
}
let HP={
    name: "Harry Potter",
    price:  40,
    autor: "j.k Rowling",
    pages:250
}
let Juramentada={
    name: "Juramentada",
    price: 35,
    autor: "Brandon Sanderson",
    pages:1300
}


// contenedor.save(Juramentada).then((response)=>{
//     console.log(response)
// })


contenedor.productoRamdom().then((Response)=>{
    console.log(Response)
})

// contenedor.getById(1).then((Response)=>{
//     console.log(Response)
// })

// contenedor.deletById(1).then((response)=>{
//     console.log(response)
// })
// contenedor.deletById(2).then((response)=>{
//     console.log(response)
// })

// contenedor.deleteAll("Yes delete").then((Response)=>{
//     console.log(Response)
// })