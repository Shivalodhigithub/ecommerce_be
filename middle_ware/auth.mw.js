const user_model=require('../model/user.model')
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

module.exports={
    verifyReq_body:verifyReq_body
};

 