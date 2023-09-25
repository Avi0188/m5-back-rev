const jwt=require("jsonwebtoken")
const BlacklistModel = require("../models/blacklist.model")


const auth= async(req,res,next)=>{
    try {
        const token=req.header.authorization?.split(" ")[1]||null
        if(token){
            let existingToken= await BlacklistModel.find({blacklist:{$include:token}})
            if(existingToken.length){
                return res.send({error:"Login again"})
            }
            let decode=jwt.verify(token,"masai")
            req.body.userID=decode.userID
            return next()
        }

    } catch (error) {
        res.status(500).send("can not access")
    }
}