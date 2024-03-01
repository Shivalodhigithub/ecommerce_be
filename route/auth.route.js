/** 
 * POST  localhost:8888/ecomm/api/v1/auth/signup 
 * I need to intercept this
 */
const authController=require('../controller/auth.controller')
module.exports=(app)=>{
    // app.post('/eccom_db/app/v1/auth/signup',hand over to right controller)

    app.post('/ecomm/api/v1/auth/signup',authController.signup);
}