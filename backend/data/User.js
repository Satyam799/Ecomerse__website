const bcrypt=require('bcrypt')


const Users=[
    {
        name:'Admin user',
        email:'admin@emial.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:' user',
        email:'user@emial.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'satyam',
        email:'satyam@emial.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    }
]

module.exports={Users}