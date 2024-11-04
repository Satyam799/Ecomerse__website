const mongoose=require('mongoose')


const Userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },isAdmin:{
        type:Boolean,
        require:true,
        default:false
    }
},{
    timestamps:true
})

const User=mongoose.model('User',Userschema)

module.exports=User