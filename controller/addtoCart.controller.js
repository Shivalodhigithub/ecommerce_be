/**
 * 
 */

const add_toCart_model=require("../model/add.model")

exports.addtoCart=async(req,res)=>{
    try {
        //read request from body 
        const req_body=req.body;

        const add_toObj={
            user_name:req_body.user_name,
            user_id:req_body.user_id,
            prod_id:req_body.prod_id,
            prod_name:req_body.prod_name
        }

        //and insert to data base 
        const created=await add_toCart_model.create(add_toObj);
         
        // and return response
        return res.status(200).send(created);
        
    } catch (error) {
        console.log("Error while add to cart",error); 
        return res.status(500).send({
            message:"Error while add to cart"
        })
        
    }
}