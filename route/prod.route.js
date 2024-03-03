/**
 * I need to intercept this
 * localhost:8888/ecom_db/api/create_category
 */
const prod_controller=require('../controller/prod.controller')
const middle_ware=require('../middle_ware/auth.mw')
module.exports=(app)=>{
    app.post('/ecom_db/api/create_category',[middle_ware.verify_token,middle_ware.isAdmin],prod_controller.create_product);
}
