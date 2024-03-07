
const prod_model=require("../model/product.model")
 
/**
 * Create product and return created product
 */
exports.Create_prod=async(req,res)=>{
    try {
        //read the request body 
        const req_body=req.body; 
     
        const prod=await prod_model.findOne({prod_id:req_body.prod_id}); 
        // console.log(prod);
        // if(prod){
        //     return res.status(400).send({
        //         message:"This product id is already exist"
        //     })
        // }

        const prod_obj={
            prod_name:req_body.prod_name,
            prod_id:req_body.prod_id,
            prod_description:req_body.prod_description

        }
        //insert into data base 
        const created_prod=await prod_model.create(prod_obj);
        res.status(200).send(created_prod);

        //return product
        
    } catch (error) {
        console.log("Error while creating the product",error)
        return res.status(500).send({
            message:"Error while creating the product"
        })
        
    }
}

/** 
 * fetch all product from data base
 */

exports.get_prods=async(req,res)=>{
    try {
        const prods=await prod_model.find();
        res.status(200).send(prods);
        
    } catch (error) {
        console.log("Error while fatching products",error)
        return res.status(500).send({
            message:"Error while fatching product"
        })
        
    }
}

/**
 * fetch single record by using id
 */

exports.single_prod=async(req,res)=>{
    // read id from params 
    // let id=req.params.id;
    // console.log(req.params);
    try {
        const prod_sing=await category_model.findOne({_id:req.params.id})
        if(!prod_sing){
            return res.status(400).send({
                message:"This id product is not available in db"
            })
        }
        return res.status(200).send(prod_sing);
       // return response
        
    } catch (error) {
        console.log("Error while fatching single product",error);
        return res.status(500).send({
            message:"Error while fatching single product"
        })
        
    }
}

/** 
 * update product 
 */

exports.update_prod=async(req,res)=>{
    try {
        const id=req.params.id; 
        const updated_prod=await prod_model.findByIdAndUpdate({_id:id},req.body); 
        return res.status(200).send(updated_prod); 
    } catch (error) {
        console.log("Error while updating the product",error); 
        return res.status(500).send({
            message:"Error while updating product"
        })
        
    }
}

/**
 * delete product
 */

exports.delete_prod=async(req,res)=>{
    try {
        const deleted=await prod_model.findOneAndDelete({_id:req.params.id})
        console.log(deleted)
        return res.status(200).send(deleted);
        
    } catch (error) {
        console.log("Error while deleting product",error); 
        return res.status(500).send({
            message:"Error while deleting product"
        })
        
    }
}