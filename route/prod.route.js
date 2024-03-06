/**
 * I need to intercept this
 * localhost:8888/ecom_db/api/create_category
 */
const prod_controller=require('../controller/prod.controller')
const middle_ware=require('../middle_ware/auth.mw')
module.exports=(app)=>{
    app.post('/ecom_db/api/create_category',[middle_ware.verify_token,middle_ware.isAdmin],prod_controller.create_product);


    // localhost:8888/ecom_db/api/getting_category
  app.get('/ecom_db/api/getting_category',[middle_ware.verify_token],prod_controller.get_prods);

  //get single user localhost:8888/ecom_db/api/getting_category/65e414f0def5e5fdd6fc394a
  app.get('/ecom_db/api/getting_category/:id',[middle_ware.verify_token],
  prod_controller.singl_prod);

//   update the product name localhost:8888/ecom_db/api/getting_category/65e414f0def5e5fdd6fc394a 
app.put("/ecom_db/api/getting_category/:id",[middle_ware.verify_token],prod_controller.update_prod)

// delete the product  
// localhost:8888/ecom_db/api/delete_category/65e414f0def5e5fdd6fc394a 
app.delete("/ecom_db/api/delete_category/:id",[middle_ware.verify_token],prod_controller.delete_prod)
}
