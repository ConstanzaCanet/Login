import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cors from 'cors'
import initializePassportConfig from './passport-config.js';


const app = express();
const PORT= 8080;
const server= app.listen(PORT,()=>console.log('te escucho en el puerto '+PORT+' amigo'))
const connection = mongoose.connect("mongodb+srv://Constanza:Konecta+865@products.fq2mz.mongodb.net/entregableRedes?retryWrites=true&w=majority")

app.use(cors());
app.use(session({
    store:MongoStore.create({mongoUrl:"mongodb+srv://Constanza:Konecta+865@products.fq2mz.mongodb.net/entregableRedes?retryWrites=true&w=majority"}),
    secret:"ProbandoFacebook",
    resave:false,
    saveUninitialized:false
}))
app.use(express.json());
app.use(express.static('public'))
/*inicializamos passport config */
initializePassportConfig();
/*inicializamos passport */
app.use(passport.initialize());
app.use(passport.session());


/*auth de facebook o red elegida    "entrada"*/
app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}),(req,res)=>{

})

/*lo que se da de respuesta "salida" */
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    //failureRedirect: '/fake',
}),(req,res)=>{
    res.send({message:'Usuario logueado'})
})
//https://866f-2803-9800-9882-b4c2-f8af-8961-9a71-e16d.ngrok.io -> ngrok
app.get('/',(req,res)=>{
    console.log("holis")
})