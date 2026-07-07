const { v2: cloudinary }=require("cloudinary")
const fs = require("fs");
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){
            return null;
        }
      const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("File is uploaded on the cloudinary",
            response.url
        );
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

module.exports = uploadOnCloudinary;