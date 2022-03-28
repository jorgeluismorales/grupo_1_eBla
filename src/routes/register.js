const { Router } = require('express');
const { registerView, registerController } = require('../controllers/register');
const uploadMiddleware = require('../middlewares/uploadImage');
const registerValidator = require('../validators/register');
const router = Router();

router.get('/', registerView);

router.post('/', uploadMiddleware.single('image'),  registerController);

module.exports = router;