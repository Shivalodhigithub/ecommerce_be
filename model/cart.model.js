
const mongoose=require("mongoose"); 

// create schema  
const cartSchema=new mongoose.Schema({
    user_id:{
        type:String,
        ref:"User",
        required:true
    },
    items:[
        {
            product_id:{
                type:Number,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            }
        }
    ]
},{timestamps:true,versionKey:false}) ; 

//create model

module.exports=mongoose.model("cart",cartSchema);