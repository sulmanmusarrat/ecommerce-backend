import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "dvzt212cc",
  api_key: "116967919566489",
  api_secret: "8d2RL6Tsw53MwHfUTh7Not-9nCA",
});

export default cloudinary;
