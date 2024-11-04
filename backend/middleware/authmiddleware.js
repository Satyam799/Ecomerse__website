const { asynchandler } = require('./asyncmiddleware')
const jwt =require('jsonwebtoken')
const User = require('../Modal/usermodal')
require('dotenv/config')


const protect=asynchandler(async (req,res,next)=>{
    let token 
    token =req.cookies.jwt
    console.log(token)
if(token){
    try{
    const decode=jwt.verify(token,process.env.JWT_SECRATE)
    req.user= await User.findById(decode.userId).select('-password')
    next()
    }catch(err){
        res.status(401)
        
        throw Error(err)
    }
}else{
    res.status(401)
    throw Error('No authorized Token failed')

}

})



// Admin middle ware



const Adminaccess=asynchandler(async (req,res,next)=>{
console.log(req.user)

    if(req.user && req.user.isAdmin===true){
        next()
    }else{
        res.status(401)
        throw Error('No authorized as admin failed')
    
    }



})


module.exports={protect,Adminaccess}