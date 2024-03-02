/** 
 * I need to write logic/controller 
 */
const user_model=require('../model/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
exports.signup=async(req,res)=>{
    /** 
     * Logic to create user
     */

    //1.Read the request body 
    const req_body=req.body; 

    //2. Insert the data into database 
    const userobj={
        name:req_body.name,
        email:req_body.email,
        user_id:req_body.user_id,
        password:bcrypt.hashSync(req_body.password,8)
    };
    
    try {
        const user_created=await user_model.create(userobj); 
        res.status(201).send(user_created)
        
    } catch (error) {
        console.log('Error whiling inserting data into db',error)
        res.status(500).send({
            message:"Some error is happening while registering the user"
        })
        
    }


    //3. return response back to the user
}

/** 
 * Sign 
 */

exports.singin=async(req,res)=>{
    try {
    const req_body=req.body;
    //check user id 
    const user=await user_model.findOne({user_id:req_body.user_id}); 
    if(user==null){
        return res.status(401).send({
            message:"User does not exist"
        })
    }

    // check user password  
    const isValidPassword=bcrypt.compareSync(req_body.password,user.password); 
    if(!isValidPassword){
        return res.status(401).send({
            message:"Password does not match"
        })
    }

    // generate token  
    const token=jwt.sign({id:user.user_id},"my secrest xyz" , {expiresIn:120})

    //send token with 
    const user_obj={
        name:user.name,
        email:user.email,
        password:user.password,
        send_token:token
    }
    res.status(200).send(user_obj);
        
    } catch (error) {
        console.log("Error while trying to signing:",error)
        res.status(500).send({
            message:"Error while signing"
        })
        
    }
}