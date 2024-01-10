const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "nopeee",
  api_key: "257714125837638",
  api_secret: "TxSHKWVpsMeO4BiOVsHqb0rBJlg",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["pdf"],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadCloud = multer({ storage });
module.exports = { uploadCloud, cloudinary };
