const express=require('express');
const admin_Router=express.Router();
const admin_Controller=require('../Controller/adminController');
const isAuth =require('../middle-ware/isAuth')


admin_Router.get('/add-product',admin_Controller.getPageView)
admin_Router.post('/postValue',admin_Controller.postPage)
admin_Router.get('/product_detail',isAuth ,admin_Controller.getDetailPage)
//---------------------------------------------------------------------------
admin_Router.get('/adminProductEdit/:p_id',admin_Controller.getadminEdit)
admin_Router.post('/posteditvalues',admin_Controller.postEditFormValuePage)
//----------------------------------------------------------------------------------------------
admin_Router.get('/adminDeleteProduct/:p_id',admin_Controller.getadmindelete)
//admin_Router.post('/postdeletevalues',admin_Controller.postAdminDelete)





module.exports=admin_Router;