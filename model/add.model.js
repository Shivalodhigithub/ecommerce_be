const mongoose=require('mongoose'); 

//create schema for add to cart
const AddToCart_schema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,  
    },
    user_id:{
        type:String,
        required:true
    },
    prod_id:{
        type:Number,
        required:true,
        unique:true
    },
    prod_name:{
        type:String,
        required:true
    }
},{timestamps:true,versionKey:false});

//create model for add to cart schema

module.exports=mongoose.model("AddtoCart",AddToCart_schema);