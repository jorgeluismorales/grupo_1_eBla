const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'public/images/products');
    },

    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    },
});

const uploadProductImage = multer({ storage });

module.exports = uploadProductImage;
