import passport from "passport";
import local from 'passport-local';
import userModel from "../models/userModel.js";
import { createHash, validatePassword } from "../utils.js";




const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, email, password, done) => {
        try {
            const {
                first_name,
                last_name,
            } = req.body;
            if (!first_name || !last_name) return done(null, false,{message:"Incomplete values"})

            const hashedPassword = await createHash(password)
            const role = "user"
            const exist = await userModel.findOne({
                email
            });
            if (exist) return done(null, false,{message:"The user already exists "})

            const user = {
                first_name,
                last_name,
                email,
                password: hashedPassword,
                role: "user",
            }
            const result = await userModel.create(user);
            done(null, result)
        } catch (error) {
            done(error);
        }
    }))

    passport.use('login', new LocalStrategy({usernameField:'email'}, async (email, password, done)=>{
        try {
            if(!email) return done(null, false,{message:"Incomplete values"})
            const user = await userModel.findOne({email})
            if(!user) return  done(null, false,{message:"The user not exists "})
            const isValidPassword = await validatePassword(user, password)
            if(!isValidPassword) return done(null, false,{message:"Incorrect password"})
            done(null,user)
        } catch (error) {
            done(error)
        }
    }))



    passport.serializeUser((user,done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await userModel.findOne({_id:id});
        return done(null,result)
    })
}

export default initializePassport;

