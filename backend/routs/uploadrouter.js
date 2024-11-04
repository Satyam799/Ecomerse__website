const path = require('path');

const multer=require('multer')
const express=require('express')

const router=express.Router()
const File_type = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
  };
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const isValid=File_type[file.mimetype]
        let error=new Error('Invalid image type')
        if(isValid) error=null
        cb(error,'uploads/')
    },
    filename:function(req, file ,cb){
        const extension=File_type[file.mimetype]
        const fileName=file.originalname.split(' ').join('-')
        cb(null,`${fileName.split('.')[0]}-${Date.now()}.${extension}`)
    }

})

const upload=multer({storage:storage})


function checkfiletype(file,cb){

const filetyp=/jpg|jpeg|png/

const extname=filetyp.test(path.extname(file.originalname).toLowerCase())
const mimetype=filetyp.test(file.mimetype)

if(extname && mimetype){
    return cb(null,true)
}else{
    cb('Image only!')
}
}




router.post('/',upload.single('image'),(req,res)=>{
    res.send({
        message:'Image is Uploaded successfully',
        image:`${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, '/')}`
    })
})


module.exports=router











/*const router=express.Router()

const storage=multer.diskStorage({
    destination:function(req,file,cd){
        cb(null,'Upload/')
    },
    filename:function(req,file,cd){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

function cheackfiletype(file,cd){

    const filetypes=/jpg|jpeg|png/
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    const minetype=filetypes.test(file.minetype)
    if(extname && minetype){
        return cb(null,true)
    }else{
        cb('Image only!')
    }
}

router.post('/',upload.single('image'),(req,res)=>{
    res.send({
        message:'Image uploaded successfully',
        image:`/${req.file.path}`
    })
})

module.exports=router*/