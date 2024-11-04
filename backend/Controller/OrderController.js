const { asynchandler } = require("../middleware/asyncmiddleware");
const Order = require("../Modal/orderschema");

//@desc create new order
//@route POST /api/orders
//@access private

const addOrdersItems = asynchandler(async (req, res) => {
try{
   if(req.body.cartItem.length>0){
        const data=await Order.create({
            orderItem:req.body.cartItem.map((el)=>({...el,product:el._id,_id:undefined})),
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymetMethod,
            totalPrice:req.body.totalproice,
            itemsPrice:req.body.itemprice,
            shippingPrice:req.body.shippingprice,
            taxPrice:req.body.taxprice,
            user:req.user._id
        })
       
        res.status(200).send(data)
    }
    
  
}catch(err){
    console.log(err)
    res.status(404).send(err)

}
})

;


//@desc Get Logged in user orders
//@route GET /api/orders/mine
//@access private


const getmyorders=asynchandler(async (req,res)=>{

    const data=await Order.find({user:req.user._id})

    return res.status(200).send(data)

})

//@desc Get order by id
//@route GET /api/orders/:id
//@access private


const getorderbyid=asynchandler(async (req,res)=>{
    const data=await Order.findById(req.params.id).populate('user','name email')
    if(data){
    return res.status(200).send(data)
    }else{
     res.status(404)
     throw  new Error('Oder not found')
    }
})


//@desc Update order to pay
//@route PUT /api/orders/:id/pay
//@access private


const Updateordertopay=asynchandler(async (req,res)=>{
   const order= await Order.findByIdAndUpdate(req.params.id,{
        isPaid:true,
        paidAt:new Date(),
        paymentResults:{
            id: req.body.id,
            status:req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }

    },{new:true})
  if(order){
     res.status(200).send(order)
  }else{
     res.status(404)
     throw Error('No order was found')

  }
})


//@desc Update order to deliver
//@route PUT /api/orders/:id/deliver
//@access private/Admin

const Updateordertodeliver=asynchandler(async (req,res)=>{
  
    const data= await Order.findByIdAndUpdate(req.params.id,{

        isDelivered:true,
        deliveredAt:new Date()

    },{new:true})
    if(data){
      res.status(200).send(data)
    }else{
        res.status(400).send('orders not found')

    }
})



//@desc GET ALL ORDERS
//@route GET /api/orders/
//@access private/Admin


const Getallorders=asynchandler(async (req,res)=>{
    try{
    const orders=await Order.find()
    return res.status(200).send(orders)

    }catch(err){
        return res.status(400).send(err)

    }

})

module.exports = {
  addOrdersItems,
  Getallorders,
  Updateordertodeliver,
  Updateordertopay,
  getmyorders,
  getorderbyid,
};