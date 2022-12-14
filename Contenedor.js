import fs from "fs"
import __dirname from "./src/utils.js";
const pathToFile = __dirname+'/files/products.json'


class Contenedor {
    //this function save an objet in json, n° pages is important but not required 
    save = async (obj) => {
        if (!obj.name || !obj.price || !obj.autor) {
            return {
                status: "error",
                message: "missing required fields",
            };
        };
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                let id = products.length + 1; // ¿por que funciona mal con el operador ++ ?
                obj.id = id;
                products.push(obj);
                await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
                return {
                    status: "success",
                    message: `The product saved  successfully, the id of this producs is ${id}`
                }
            } else {
                obj.id = 1
                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify([obj], null, 2)
                )
                return {
                    status: "success",
                    message: "user crated successfully"
                }
            }
        } catch (error) {
            return {
                status: "error",
                message: error.message
            }
        }
    }
    getAll = async () => {
        try {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                return {
                    status: "success",
                    products: products
                }
        } catch (error) {
            return {
                status: "error",
                message: error.message
            }
        }
    }
    getById = async (id) => {
        if (!id) {
            return {
                status: "error",
                message: "ID is required"
            }
        }
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let products = JSON.parse(data)
            let product = products.find((product) => product.id == id);
            if (product) {
                return {
                    status: "success",
                    product: product
                }
            } else {
                return {
                    status: "error",
                    message: "Product not found"
                }
            }
        }
    }
    deleteById = async (id) => {
        if (!id) {
            return {
                status: "error",
                message: "ID is required for delete"
            }
        }
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let products = JSON.parse(data)
            let newProducts = products.filter((product) =>
                product.id != id)
            await fs.promises.writeFile(
                pathToFile,
                JSON.stringify(newProducts, null, 2)
            )
            return {
                status: "success",
                message: "product deleted successfully"
            }
        } else {
            return {
                status: "error",
                message: "No product found"
            }
        }
    }
    // for delete db enter "Yes delete" at param of a function "delteAll"
    deleteAll = async(securityWord) =>{
        if(securityWord == "Yes delete"){
            fs.unlink(pathToFile,error => {
            if(error){
                return{
                    status: "error",
                    message: "No file found"
                }
            } else {
                return{
                    status: "success",
                    message: "file deleted successfully"
                }
         }
        }
    )}
    }
    productoRamdom = async () => {
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let products = JSON.parse(data)
            let numeroRamdom = Math.random() * (products.length) + 1;
            let product = products.find((product) => product.id == Math.floor(numeroRamdom));
            if (product) {
                return {
                    status: "success",
                    product: product
                }
            } else {
                return {
                    status: "error",
                    message: "Product not found"
                }
            }
        }
    }
    updateItem = async (object, id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        let products = await this.getAll()
        try {
            let arrayProducts = products.products.map(product => {
                if (product.id == id) {
                    return {
                        name: object.name ? object.name : product.name,
                        price: object.price ? object.price : product.price,
                        image: object.image ? object.image : product.image,
                        id: product.id
                    }
                } else {
                    return product
                }
            })
            let productUpdate = arrayProducts.find(product => product.id == id)
            if (productUpdate) {
                await fs.promises.writeFile(pathToFile, JSON.stringify(arrayProducts, null, 2))
                return {
                    status: "success",
                    message: "successfully upgraded product",
                    productNew: productUpdate
                }
            } else {
                return {
                    status: "error",
                    message: "Product not found"
                }
            }
        } catch {
            return products
        }
    }}


export default Contenedor