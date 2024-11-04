const { asynchandler } = require("../middleware/asyncmiddleware");
const Product = require("../Modal/productmodal");

const getProduct = asynchandler(async (req, res) => {
  const pagesize=8;
  const page=Number(req.query.pageNumber)||1;
  const keyword=req.query.keyword ? {name:{$regex:req.query.keyword,$options:'i'}} : {}

  const count=await Product.countDocuments({...keyword})


  const data = await Product.find({...keyword}).limit(pagesize).skip(pagesize * (page-1))

  return res.status(200).send({data,page,pages:Math.ceil(count/pagesize)})
});

const getProductId = asynchandler(async (req, res) => {
  const data = await Product.findById(req.params.id).populate('reviews');

  if (data) {
    return res.status(200).send(data)
  }
  res.status(400);
  throw Error("Resource not found");
});



const crearteproduct= asynchandler(async (req,res)=>{

  const data=await Product.create({
    name:'sample',
    price:549,      
    image:'samaple',
    brand:'samaple',
    category:'samaple',
    countInStock:15,
    numReviews:30,
    description:'samaple',
    user:'66e1f34c2e22f62ca89b90bc'
  })
  if(data){
    res.status(200).send(data)
  }else{
    res.status(400).send('no product created try again')
  }
})

const updateproduct=asynchandler(async(req,res)=>{
 
  const data=await Product.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    price:req.body.price,      
    image:req.body.imageurl,
    brand:req.body.brand,
    category:req.body.category,
    countInStock:req.body.countInStock,
    numReviews:req.body.numReviews,
    description:req.body.description,
  },{new:true})

  if(data){
    res.status(200).send(data)
  }else{
    res.status(400).send('no product created try again')
  }

})


const DeleteProduct=asynchandler(async (req,res)=>{
try{
  await Product.findByIdAndDelete(req.params.id)
  res.status(200).json({message:'Deleted successfully'})
}catch(err){
    res.status(400).json({message:'Unable to delete the data'})
    
  }
})


const Gettopproducts=asynchandler(async(req,res)=>{

  try{
  const gettopproduct=await Product.find().sort({rating:-1}).limit(3)
  res.status(200).json({
    gettopproduct
  })
  }catch(err){
    res.status(400).send('No results found')
  }


})





module.exports={getProduct,getProductId,crearteproduct,updateproduct,DeleteProduct,Gettopproducts}

/*
 name:req.body.name,
    price:req.body.price,      
    image:req.body.image,
    brand:req.body.brand,
    category:req.body.category,
    countInStock:req.body.countInStock,
    numReviews:req.body.numReviews,
    description:req.body.description,
*/