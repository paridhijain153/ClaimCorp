import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer, folder = "claimcorp") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier
      .createReadStream(fileBuffer)
      .pipe(uploadStream);
  });
};

export default uploadToCloudinary;