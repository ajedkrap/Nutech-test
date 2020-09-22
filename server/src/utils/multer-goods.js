require('dotenv').config()
const multer = require("multer");
const path = require("path");
const { v3: uuidv3, v4: uuidv4 } = require("uuid");
const { APP_GOODS_KEY } = process.env

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./public/goods");
  },
  filename: function (request, file, callback) {
    const { name } = request.body
    const uuid = name && name !== "" ? uuidv3(name, APP_GOODS_KEY) : uuidv4()
    callback(null, "GOODS_" + uuid.split("-").join("") + path.extname(file.originalname));
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 100 },
  fileFilter: function (req, file, callback) {
    if (!file.originalname.match(/\.(jpg|png)$/i)) {
      return callback(new Error("Only .jpg and .png are allowed!"), false);
    }
    callback(null, true);
  }
})

module.exports = upload.single("picture");
