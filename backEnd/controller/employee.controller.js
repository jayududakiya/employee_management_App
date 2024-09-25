const Employe = require('../model/emoloyess.model')

exports.deleteemploye = async (req,res)=>{
    try {
        let employee = req.Employe;
        employee = await Employe.findByIdAndDelete(
            employee._id,
            { $set: {isDelete:true}},
            {new:true}
        );
        res.status(202).jon({employee,msg:"Employee delete success..."})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal Server Error"})
    }
}