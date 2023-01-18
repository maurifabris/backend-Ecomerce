import fs from "fs"
import __dirname from "../utils.js"

class ContenedorFS {

    constructor() {
        this.path = `${__dirname}/files/products.json`
        this.init();
    }
    init = async () => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
    }

    readProducts = async () => {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        let list = JSON.parse(data)
        return list ;
    }

    getAll = () => {
        return this.readProducts();
    }

    getById = async (id) => {
        const products = await this.readProducts()
        const product = products.find(prod => prod.id === id)
        return product
    }
    deleteById = async (id) => {
        const products = await this.readProducts()
        let newProducts = products.splice(id, 1)
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(newProducts, null, 2)
    )
    return {
        status: "success",
        message: "product deleted successfully"
    }
        
    }
    exists = async (id) => {
        let products = await this.readProducts()
        return products.some(prod => prod.id === id)
    }
    save = async (prod) => {
        let products = await this.readProducts()
        if (products.length === 0) {
            prod.id = 1
        } else {
            prod.id = products.length + 1  // products no tiene id 
        }
        products.push(prod);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
    }
    updateItem = async (object, id) => {
        let products = await this.readProducts()
        const list =  products.map( product => {
            if( product.id == id){
                return {
                    name: object.name ? object.name : product.name,
                    price: object.price ? object.price : product.price,
                    pages: object.pages ? object.pages : product.pages,
                    id: product.id
                }
            }
        })

    }
}


export default ContenedorFS