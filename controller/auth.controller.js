/** 
 * I need to write logic/controller 
 */
const user_model=require('../model/user.model')
const bcrypt=require('bcryptjs')
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