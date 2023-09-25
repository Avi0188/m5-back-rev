const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
   name:String,
   email:String,
   password:String,
   gender:String,
   confirmPassword:String

})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel