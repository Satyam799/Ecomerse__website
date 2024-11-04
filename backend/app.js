const path=require('path')
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { products } = require("./data/products");
const  mongoose  = require("mongoose");
const  productroute=require('./routs/productrouts')
const  userrouter=require('./routs/userRoute')
const orderrouter=require('./routs/Order')
const uploadroute=require('./routs/uploadrouter')
const { notFound, errorHandler }=require('./middleware/Errorhandler');
const cookieParser = require("cookie-parser");


require("dotenv/config");

const app = express();
app.use('/uploads',express.static(path.join(__dirname,'..'+'/uploads')))
console.log(path.join(__dirname,'..'+'/uploads'))
app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true
}));
app.use(morgan("tiny"));


mongoose.connect(process.env.CONNECTION_STRING,{
  dbName:'ProShop'
}).then((res)=>console.log("Database is connected successfully"))



app.use('/api/product',productroute)
app.use('/api/user',userrouter)
app.use('/api/orders',orderrouter)
app.use('/api/config/paypal', (req,res)=>res.send({clientId:process.env.Pay_Pal_client_id}))
app.use('/api/upload',uploadroute)
app.use(errorHandler)

app.use(notFound)
app.listen(5000, () => {
  console.log(`server is running on http://localhost:5000`);
});
