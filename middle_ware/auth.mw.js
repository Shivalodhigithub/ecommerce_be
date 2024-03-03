const user_model=require('../model/user.model')
const jwt=require('jsonwebtoken')
const sec=require('../config/sec.config')
/**
 * create middle ware to check request body 
 
 */

const verifyReq_body=async(req,res,next)=>{
   
    try {
         // 1.check for user  
         if(!req.body.name){
            return res.status(400).send({
                message:"Error Name was not fill"
            })
         }

          // 2.check for email
          if(!req.body.email){
            return res.status(400).send({
                message:"Error email was not fill"
            })
         }

         // 3.check for user id  alredy prsent on not 
         const user = await user_model.findOne({user_id:req.body.user_id})
         if(user){
            return res.status(400).send({
                message:"User Id already exist"
            })
         }  

         next(); // it for pass control to next middle ware
    } catch (error) {
        console.log("catch error",error)
        res.status(500).send({
            message:"Error while checking the request body"
        })
        
    }
}
const verify_signin=(req,res,next)=>{
    try {
        if(!req.body.user_id){
            return res.status(401).send({
                message:"user does not providing"
            })
        }

        if(!req.body.password){
            return res.status(401).send({
                message:"password does not providing"
            })
        }
        next();
        
    } catch (error) {
        console.log("Error when verify sign in body",error)
        req.status(500).send({
            message:"error while verifying sign body"
        })
        
    }
}

/**
 * verify tokens then give access
 */
const verify_token=(req,res,next)=>{
    //read the token from header 
    const token=req.headers['x-access-token'];
    // console.log(token)
    if(!token){
        return res.status(400).send({
            message:"Token is not available"
        })
    }
 
           //verify the token 
    jwt.verify(token,sec.security_key,async(err,encoded)=>{
        if(err){
            return res.status(400).send({
                message:"Unathurosid token!"
            })
        }

            const user=await user_model.findOne({user_id:encoded.id})
            if(!user){
                return res.status(400).send({
                    message:"token does not exist for this user id"
                })
            }
            req.user=user;
            next();

    })
      
    //then send next
}
const isAdmin=(req,res,next)=>{
    const user=req.user; 
    // console.log(user); 
    if(user && user.type == 'Admin'){
        next();
    }
    else{
        res.status(403).send({
            message:"Admin users are only to create product"
        })
    }

}
module.exports={
    verifyReq_body:verifyReq_body,
    verify_signin:verify_signin,
    verify_token:verify_token,
    isAdmin:isAdmin
};

 