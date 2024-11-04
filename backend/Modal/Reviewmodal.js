const mongoose=require('mongoose')
const User = require('./usermodal')


const Reviewschema=new mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     require:true,
     ref:'User'
    },
    name:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
   
},{
    timestamps:true
})

const Review=mongoose.model('Review',Reviewschema)

module.exports=Review