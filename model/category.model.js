const mongoose=require('mongoose'); 


//create schema 
const category=mongoose.Schema({
    prod_name:{
        type:String,
        require:true,
    },
    prod_category:{
        type:String,
        require:true,
    },
    prod_id:{
        type:Number,
        require:true,
        minLength:12
    }

},{timestamps:true,versionKey:false});
//create model 
module.exports=mongoose.model("product",category)