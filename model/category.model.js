const mongoose=require('mongoose'); 


//create schema 
const category=mongoose.Schema({
    category_name:{
        type:String,
        require:true,
    },
    category_id:{
        type:Number,
        require:true,
        unique:true,
        minLength:12
    }

},{timestamps:true,versionKey:false});
//create model 
module.exports=mongoose.model("Category",category)