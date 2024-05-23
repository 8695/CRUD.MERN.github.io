const {v2} = require('cloudinary');
const fs = require('fs');



v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View Credentials' below to copy your API secret
});

    
    // Upload an image

    const uploadOncloudnary = async(localPath)=>{
        //console.log(localPath);
        try{
            if(!localPath){
                return null;
            }

             const response =await v2.uploader.upload(localPath, {
                resource_type:"auto"
            })
            console.log("file uploaded successfully", response.url);
            fs.unlinkSync(localPath);
            return response;
        }
        catch(error){
            
            console.log(error)
            
        }
    }
    
    
module.exports = {uploadOncloudnary}