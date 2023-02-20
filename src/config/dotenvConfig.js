import dotenv from 'dotenv';




const mode = process.argv.slice(2)[0]
console.log(mode)

dotenv.config({
    path:mode=="PRODUCTION"? '.envProduction' : '.envDevelopment'
});

const config = {
    mongo: {
        password : process.env.MONGO_PASSWORD   
    }
}

export default config