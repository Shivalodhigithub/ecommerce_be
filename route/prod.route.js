/**
 * I need to intercept this
 * localhost:8888/ecom_db/api/create_category
 */
const prod_controller=require('../controller/prod.controller')
module.exports=(app)=>{
    app.post('/ecom_db/api/create_category',prod_controller.create_product);
}
