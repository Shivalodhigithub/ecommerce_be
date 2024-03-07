/**
 * I need to intercept this
 * localhost:8888/ecom_db/api/create_category
 */
const category_controller=require('../controller/category.controller')
const middle_ware=require('../middle_ware/auth.mw')
module.exports=(app)=>{
    app.post('/ecom_db/api/create_category',[middle_ware.verify_token,middle_ware.isAdmin],category_controller.create_category);


    // localhost:8888/ecom_db/api/getting_category
  app.get('/ecom_db/api/getting_category',[middle_ware.verify_token],category_controller.get_category);

  //get single user localhost:8888/ecom_db/api/getting_category/65e414f0def5e5fdd6fc394a
  app.get('/ecom_db/api/getting_category/:id',[middle_ware.verify_token],
  category_controller.singl_category);

//   update the product name localhost:8888/ecom_db/api/getting_category/65e414f0def5e5fdd6fc394a 
app.put("/ecom_db/api/getting_category/:id",[middle_ware.verify_token],category_controller.update_category)

// delete the product  
// localhost:8888/ecom_db/api/delete_category/65e414f0def5e5fdd6fc394a 
app.delete("/ecom_db/api/delete_category/:id",[middle_ware.verify_token],category_controller.delete_category)
}
