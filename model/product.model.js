const mongoose=require('mongoose'); 

//create schema(document)
const productSchema=new mongoose.Schema({
    prod_name:{
        type:String,
        lowerCase:true,
        require:true
    },
    prod_id:{
        type:Number,
        require:true,
        unique:true,
        minLength:12
    },
    prod_description:{
        type:String,
        require:true,
        minLength:25
    }

},{timestamps:true,versionKey:false})

// create model(collection) 
module.exports=mongoose.model("product",productSchema);