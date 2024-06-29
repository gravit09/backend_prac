import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//we are uplaoding file in two step first we hold it in our local server then uplaod

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("no file selected");
      return null;
    }
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("file uploaded successfully");
    console.log(res.url);
    return res;
  } catch (err) {
    fs.unlinkSync(localFilePath); //remove the locally saved file
    return null;
  }
};

export { uploadOnCloudinary };
