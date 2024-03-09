
/* This file will start server */ 

const express=require('express')
const app=express(); 
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const server_cofig=require('./config/server.config')
const db_config=require('./config/db.config')
const user_model=require('./model/user.model')

app.use(express.json()); //middle ware

/* conncet with mongo db */ 
mongoose.connect(db_config.DB_URL)

const db=mongoose.connection; 

db.on('error',()=>{
    console.log("Error while connectiong the data base")
})

db.once('open',()=>{
    console.log("Succesfully connected with mongo db!")
    init();
})

const init=async()=>{
    let user=await user_model.findOne({user_id:"admin"}); 

    if(user){
        console.log('Admin is already exist')
    }
    else{
        try {
            user=await user_model.create({
                name:"kallu",
                user_id:"admin",
                email:"kallo45@gmail.com",
                password:bcrypt.hashSync("WELCOME1",8),
                type:"Admin"
            })
            console.log("User is created!",user);
            
        } catch (error) {
            console.log("Error while creating the user",error)
        }
    }
}

/* sitch the route to the server */
require('./route/auth.route')(app);
require('./route/category.route')(app);
require('./route/product.route')(app);
require('./route/cart.route')(app);
/**
 * Server is running on port
 * 
 */

app.listen(server_cofig.PORT,()=>{
    console.log(`server is running on port ${server_cofig.PORT}`);
})