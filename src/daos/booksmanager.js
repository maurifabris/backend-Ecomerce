import fs from "fs"
import __dirname from "../utils.js"

class ContenedorFS {

    constructor() {
    this.path = `${__dirname}/files/products.json`
    // this is for create a file for storage
    this.init = async () => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
    }
    // this is for read products un the json
    this.readProducts = async () => {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        let list = JSON.parse(data)
        return list ;
    }
    //this function return all items 
    this.getAll = () => {
        return this.readProducts();
    }
    // return an item whith and equal id
    this.getById = async (id) => {
        const products = await this.readProducts()
        const product = products.find(prod => prod.id === id)
        return product
    }


    // Delete an item whith equal id

    // this is for validate if the product exist
    this.exists = async (id) => {
        let products = await this.readProducts()
        return products.some(prod => prod.id === id)
    }

    // For save the product in the JSON
    this.save = async (book) => {
        let products = await this.readProducts();
        const newProduct = {
          id: products.length + 1,
          name: book.name,
          autor: book.autor,
          pages: book.pages,
          price: book.price
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      };

      this.deleteById = async (bid) => {
        const products = await this.readProducts();
        const index = products.findIndex((product) => product.id == bid);
        if (index !== -1) {
          products.splice(index, 1);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, 2)
          );
          return {
            status: "success",
            message: "product deleted successfully",
          };
        } else {
          return {
            status: "error",
            message: "product not found",
          };
        }
      };

    // For update an product 
    this.updateItem = async (object, id) => {
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
}

export default ContenedorFS