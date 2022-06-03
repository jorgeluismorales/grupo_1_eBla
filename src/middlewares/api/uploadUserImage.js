const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'public/images/users');
    },

    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    },
});

const uploadUserImage = multer({ storage });

module.exports = uploadUserImage;
