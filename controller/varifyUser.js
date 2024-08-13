
const signUp = require("../models/signUp")

const varifyUser = async(req,res)=>{
    const {mobileNumber} = req.body

    const user = await signUp.findOne({mobileNumber})

    if(!user){
        throw Error("user is not fount");
    }
    res.status(200).json({user})
}

module.exports=varifyUser