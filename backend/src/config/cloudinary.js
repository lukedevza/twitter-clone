import { v2 as cloundinary } from "cloudinary";
import { ENV } from "./env.js";

cloundinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export default cloundinary;
