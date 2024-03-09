const addtoCart_controller=require("../controller/addtoCart.controller")
/**
 * 
 * i need to intercept this localhost:8888/eccom_db/api/add_toCart
 * with controller 
 */
module.exports=(app)=>{
    // localhost:8888/eccom_db/api/add_toCart
    app.post("/eccom_db/api/add_toCart",addtoCart_controller.addtoCart)
}