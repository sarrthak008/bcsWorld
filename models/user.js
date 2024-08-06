const mongoose = require('mongoose')

const userSchma = mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     mobileNumber:{
         type:String,
         required:true
     },
     password:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     }
})

module.exports=mongoose.model("users",userSchma);