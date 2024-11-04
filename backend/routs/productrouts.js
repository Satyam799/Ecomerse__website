const express=require('express');
const { getProduct, getProductId, crearteproduct, updateproduct, DeleteProduct, Gettopproducts } = require('../Controller/Productcontroller');
const { protect, Adminaccess } = require('../middleware/authmiddleware');
const { Reviewscreation } = require('../Controller/ReviewController');


const router=express.Router()


  router.route('/').get(getProduct).post(protect,Adminaccess,crearteproduct)
  router.route('/top').get(Gettopproducts)
  router.route('/:id').get(getProductId).put(protect,Adminaccess,updateproduct).delete(DeleteProduct)

  router.route('/:id/reviews').post(protect,Reviewscreation)


  module.exports=router