const prod_model = require('../model/category.model');
exports.create_product = async (req, res) => {
    //1.take request body
    const req_body = req.body;

    // if product is already exist then 
    const prod = await prod_model.findOne({ prod_id: req_body.prod_id })
    if (prod) {
        return res.status(400).send({
            message: "This product id already persent"
        })
    }
    try {
        // 2. create product  
        let prod_obj = {
            prod_name: req_body.prod_name,
            prod_category: req_body.prod_category,
            prod_id: req_body.prod_id,
        }
        const prod_created = await prod_model.create(prod_obj);

        //3. send created product 
        return res.status(200).send(prod_created);
    } catch (error) {
        console.log("Error while creating product", error)
        return res.status(400).send({
            message: "Error while creating product"
        })
    }
}

exports.get_prods=async(req,res)=>{
    
    try {
        const prods=await prod_model.find();
        res.status(200).send(prods);
        
    } catch (error) {
        console.log("Error while getting products",error); 
        res.status(500).send({
            message:"Error while getting products"
        })
        
    }
}

exports.singl_prod=async(req,res)=>{
    // const _id=req.params
    // console.log(_id);
    // console.log(req.params.id)
    // res.send(req.params.id)
    try {
        const id=await prod_model.findOne({_id:req.params.id})
        // console.log(id);
        if(!id){
            return res.status(400).send({
                message:"Id does not available"
            })
        }
        return res.status(400).send(id);
        
    } catch (error) {
        console.log("Error while fetching single prodt",error)
        return res.status(500).send({
            message:"Error while fetching single product:"
        })
        
    }
}

/** 
 * update the product 
 */

exports.update_prod=async(req,res)=>{
    try {
        const id=req.params.id; 
        const updated_prod=await prod_model.findByIdAndUpdate({_id:id},req.body)
        // console.log(updated_prod)
        return res.status(200).send(updated_prod)
  
        
    } catch (error) {
        console.log("Error while updating the product",error)
        res.status(500).send({
            message:"Error while updating the product"
        })
        
    }
}

/** 
 * delete the product
 */

exports.delete_prod=async(req,res)=>{
    // const _id=req.params.id; 
    try {
        const id=req.params.id; 
        const deleted=await prod_model.deleteOne({_id:id})
        return res.status(200).send(deleted);
        
    } catch (error) {
        console.log("Error while deleting the product",error); 
        return res.status(500).send({
            message:"Error while deleting the product"
        })
        
    }
}