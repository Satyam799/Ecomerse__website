const mongoose  = require("mongoose")
const { products } = require("./data/products")
const { Users } = require("./data/User")
const Order = require("./Modal/orderschema")
const Product = require("./Modal/productmodal")
const User = require("./Modal/usermodal")
require("dotenv/config");

mongoose.connect(process.env.CONNECTION_STRING,{
    dbName:'ProShop'
})


const importdata=async function(){

    try{
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

        const insterdata=await User.insertMany(Users)
        const adminuser=insterdata[0]._id
        const product=products.map((el)=>{
            return {...el,user:adminuser}
        })

        const sampleproduct=await Product.insertMany(product)
        process.exit()
    }catch(err){
        console.log(err)
        process.exit(1)

    }
}

const destorydata=async function(){
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        process.exit()

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

if(process.argv[2]==='-g'){
    importdata()
}
if(process.argv[2]==='-d'){
    destorydata()
}



console.log(process.argv[2])