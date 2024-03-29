/** 
 * POST  localhost:8888/ecomm/api/v1/auth/signup 
 * I need to intercept this
 */
const authController=require('../controller/auth.controller')
const authMiddleWare=require('../middle_ware/auth.mw')
module.exports=(app)=>{
    // app.post('/eccom_db/app/v1/auth/signup',hand over to right controller)

    app.post('/ecomm/api/v1/auth/signup',[authMiddleWare.verifyReq_body],authController.signup);

    // localhost:8888/ecom_db/api/signin
    app.post("/ecom_db/api/signin",[authMiddleWare.verify_signin],authController.singin)
}