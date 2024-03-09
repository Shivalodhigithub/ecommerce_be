/**
 * I need to intercept this 
 * localhost:localhost:8888/eccom_db/api/Cart
 */
const cart_controller=require('../controller/cart.controller')
module.exports=(app)=>{
    app.post("/eccom_db/api/Cart",cart_controller.Create_Cart);
}