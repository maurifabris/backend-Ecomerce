import dotenv from 'dotenv';

const mode = process.argv.slice(2)[0];

dotenv.config({
    path:mode==="PRODUCTION"
});

const configdotenv = {
    mongo: {
        Password : process.env.MONGO_PASSWORD || 'epa'
    }
}

export default configdotenv