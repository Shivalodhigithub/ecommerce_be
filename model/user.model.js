const mongoose=require('mongoose')

//create schema 
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,  
    },
    user_id:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        required:true,
        type:String
    },
    email:{
        type:String,
        required:true,
        minLength:12,
        unique:true,
        lowercase:true,
    },
    type:{
        type:String,
        default:"Customer",
        enum:["Admin","Customer"]
    }
},{timestamps:true,versionKey:false})

//create collection 
// const user=mongoose.model("user",userSchema);
// module.exports=user;

module.exports=mongoose.model("user",userSchema);