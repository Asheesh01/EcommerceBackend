const isAdmin=async(req,res,next)=>{
if(req.user.role!="ADMIN"){
     return res.status(403).json({
            success: false,
            message: 'Access Denied. Admin only.'
        });
}
next();
}

module.exports=isAdmin