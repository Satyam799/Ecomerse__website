const mongoose=require('mongoose')

const Productschema=new mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
     ref:'User'
    },
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    reviews:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Review",
        default:[]
    },
    price:{
        type:Number,
        require:true
    },
    countInStock:{
        type:Number,
        require:true,
    },
    rating:{
        type:Number,
        require:true,
        default:0

    },
    numReviews:{
        type:Number,
        require:true,
        default:0

    }
},{
    timestamps:true
})

const Product=mongoose.model('Product',Productschema)

module.exports=Product
