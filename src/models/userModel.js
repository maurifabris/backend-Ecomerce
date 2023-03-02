import mongoose from "mongoose"

const collectionUsers = 'users'

// this file is for save a users in mongoose and mongo atlas

const schema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:'user'
    }
})

const userModel = mongoose.model(collectionUsers,schema);

export default userModel;