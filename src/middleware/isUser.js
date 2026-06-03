const isUser=async (req,resizeBy,next)=>{
    if(req.user.role!="USER"){
        return resizeBy.status(400).json({
            message:'Only users can access cart'
        })
    }
    next();
}

module.exports=isUser