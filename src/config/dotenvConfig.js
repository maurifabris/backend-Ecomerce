import dotenv from 'dotenv';
const mode = process.argv.slice(2)[0]

dotenv.config({
    path:mode=="PRODUCTION" ?  './.env.Production' : './.env.Development' 
});




const config = {
    mongo: {
        password : process.env.MONGO_PASSWORD,
        base: process.env.DB
    },

}

console.log(`${config.mongo.password}//////////////////`)

export default config