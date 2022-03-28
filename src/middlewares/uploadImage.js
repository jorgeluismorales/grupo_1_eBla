const multer = require("multer");

const PUBLIC_URL = process.env.PUBLIC_URL;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (req.headers.referer === `${PUBLIC_URL}/register`) {
      cb(null, 'public/images/users');
    } else{
      cb(null, 'public/images/products');
  }},

  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
