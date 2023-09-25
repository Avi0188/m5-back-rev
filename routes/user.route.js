
const {Router}=require("express")
const userModel = require("../models/user.model")
const bcrypt=require("bcrypt")
const userRouter=Router()
const jwt=require("jsonwebtoken")
userRouter.post("/register",async(req,res)=>{
    try {
        const {email,password,confirmPassword}=req.body
        if(password!=confirmPassword){res.status(400).send({msg:"Password not matched"})}
        const existingUser=await userModel.find({email})
        if(existingUser.length){
            return res.status(400).json({error:"user already exists"})
        }
        bcrypt.hash(password,8,async(err,hash)=>{
            if(err){res.status(400).send({error:err.message})}
            else{const user= new userModel({...req.body,password:hash})
        await user.save()
        res.status(200).send({msg:"New user registered Successfully",registeredUser:{...req.body}
    })
        }
        })
    } catch (error) {
    return res.status(500).send({error:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
  
    const existingUser=await userModel.findOne({email})
    try {
        if(existingUser){
            bcrypt.compare(password,existingUser.password,(err,data)=>{
                if(err){return res.send({msg:"Invalid Credential"})}
               else if(data){
                  
                        const token=jwt.sign({userId:existingUser._id},"masai")
                        return res.status(200).send({msg:"Login Successful",token})
                    
                }
              
                
            })
            
        }else{
            res.json({msg:"Register first"})
        }
    
      
    } catch (error) {
    return res.status(500).send({error:error.message})
    }
})

module.exports=userRouter