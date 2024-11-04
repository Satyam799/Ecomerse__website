const express=require('express')
const {
    addOrdersItems,
    Getallorders,
    Updateordertodeliver,
    Updateordertopay,
    getmyorders,
    getorderbyid,
} = require("../Controller/OrderController");

const {protect,Adminaccess} =require('../middleware/authmiddleware')

const router=express.Router()


router.route('/').post(protect,addOrdersItems).get(protect,Adminaccess,Getallorders)
router.route('/mine').get(protect,getmyorders)
router.route('/:id').get(protect,getorderbyid)
router.route('/:id/pay').put(protect,Updateordertopay)
router.route('/:id/deliver').put(protect,Updateordertodeliver)


module.exports=router