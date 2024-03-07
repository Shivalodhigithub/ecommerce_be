const prod_controller=require("../controller/product.controller")
const middle_ware=require("../middle_ware/auth.mw")
/**
 * I need to intercept this
 * localhost:8888/eccom_db/api/product
 */

module.exports=(app)=>{
    app.post("/eccom_db/api/product",[middle_ware.verify_token,middle_ware.isAdmin],prod_controller.Create_prod);

    app.get("/eccom_db/api/product",middle_ware.verify_token,prod_controller.get_prods)

    //fatch single product 
    app.get("/eccom_db/api/product/:id",middle_ware.verify_token,prod_controller.single_prod)

    // update product  
    app.put("/eccom_db/api/product/:id",[middle_ware.verify_token,middle_ware.isAdmin],prod_controller.update_prod)

    //delete product 
    app.delete("/eccom_db/api/product/:id",[middle_ware.verify_token,middle_ware.isAdmin],prod_controller.delete_prod);

}