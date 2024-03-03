const prod_model=require('../model/category.model');
exports.create_product=async(req,res)=>{
    //1.take request body
    const req_body=req.body; 

    // if product is already exist then 
   const prod=await prod_model.findOne({prod_id:req_body.prod_id})
   if(prod){
    return res.status(400).send({
        message:"This product id already persent"
    })
   }

    // 2. create product  
    const prod_obj={
        prod_name:req_body.prod_name,
        prod_category:req_body.prod_category,
        prod_id:req_body.prod_id,
    }
    
    try {
        const prod_created=await prod_model.create(prod_obj);

        //3. send created product 
        return res.status(200).send(prod_created);
    } catch (error) {
        console.log("Error while creating product",error)
        return res.status(400).send({
            message:"Error while creating product"
        })
    }
}