const category_model = require('../model/category.model');
exports.create_category = async (req, res) => {
    //1.take request body
    const req_body = req.body;

    // if product is already exist then 
    const category = await category_model.findOne({ category_id: req_body.category_id })
    if (category) {
        return res.status(400).send({
            message: "This product id already persent"
        })
    }
    try {
        // 2. create product  
        let category_obj = {
            category_name: req_body.category_name,
            category_id: req_body.category_id,
        }
        const category_created = await category_model.create(category_obj);

        //3. send created product 
        return res.status(200).send(category_created);
    } catch (error) {
        console.log("Error while creating creating", error)
        return res.status(400).send({
            message: "Error while creating creating"
        })
    }
}

exports.get_category=async(req,res)=>{
    
    try {
        const categ=await category_model.find();
        res.status(200).send(categ);
        
    } catch (error) {
        console.log("Error while getting category",error); 
        res.status(500).send({
            message:"Error while getting category"
        })
        
    }
}

exports.singl_category=async(req,res)=>{
    // const _id=req.params
    // console.log(_id);
    // console.log(req.params.id)
    // res.send(req.params.id)
    try {
        const id=await category_model.findOne({_id:req.params.id})
        // console.log(id);
        if(!id){
            return res.status(400).send({
                message:"Id does not available"
            })
        }
        return res.status(400).send(id);
        
    } catch (error) {
        console.log("Error while fetching singl category",error)
        return res.status(500).send({
            message:"Error while fetching single  category:"
        })
        
    }
}

/** 
 * update the product 
 */

exports.update_category=async(req,res)=>{
    try {
        const id=req.params.id; 
        const updated_category=await category_model.findByIdAndUpdate({_id:id},req.body)
        // console.log(updated_prod)
        return res.status(200).send(updated_category)
  
        
    } catch (error) {
        console.log("Error while updating the category",error)
        res.status(500).send({
            message:"Error while updating the category"
        })
        
    }
}

/** 
 * delete the product
 */

exports.delete_category=async(req,res)=>{
    // const _id=req.params.id; 
    try {
        const id=req.params.id; 
        const deleted=await category_model.deleteOne({_id:id})
        return res.status(200).send(deleted);
        
    } catch (error) {
        console.log("Error while deleting the category",error); 
        return res.status(500).send({
            message:"Error while deleting the category"
        })
        
    }
}