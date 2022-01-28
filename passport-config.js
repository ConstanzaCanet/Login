import passport from "passport";
import fbStrategy from 'passport-facebook';
import { users } from "./model/User.js";
const FacebookStrategy = fbStrategy.Strategy;

const initializePassportConfig=()=>{
    passport.use('facebook', new FacebookStrategy({
        clientID:'686049449075617',
        clientSecret:'76f98ba8f01bc8e3b105195822557c67',
        callbackURL:'https://3ec0-2803-9800-9882-b4c2-a832-382c-4743-424c.ngrok.io/auth/facebook/callback',
        profileFields:['emails','picture','displayName']
    }, async (accessToken,refreshToken,profile,done)=>{
        try {
            console.log(accessToken)
            console.log(profile)
            let user = await users.findOne({email:(profile.emails && profile.emails[0]) ? profile.emails[0].value : ''})
            done(null,user)
        } catch (error) {
            console.log(error)
           done(error) 
        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let getUser= await users.findById(id)
        done(null,getUser)
    })
}

export default initializePassportConfig;