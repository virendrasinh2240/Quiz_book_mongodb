const Std = require("../models/std")

const addstd = async(req,res)=>{
    
    try {
        const { stdId, std} = req.body;
        console.log(req.body);

        const data = new Std({
            stdId: stdId,
            std: std
        });

        await data.save();
        res.status(201).json({ data });
    } catch (error) {
        res.status(404).json({ error : error.message});
    }

}
module.exports = addstd