const express=require('express');
const shope_Router=express.Router();
const shope_Controller=require('../Controller/shopController');


shope_Router.get('/shop',shope_Controller.getshoppage);
shope_Router.get('/shopProductView/:prodid',shope_Controller.getshopdetailspage);


shope_Router.post('/postsearch',shope_Controller.postsearchproduct);

shope_Router.get('/addToCartPage/:cid',shope_Controller.getcartdetailpage)








module.exports=shope_Router;