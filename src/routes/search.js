const {Router} = require('express');
const searchProductController = require('../controllers/search');
const router = Router();

router.post('/', searchProductController);

module.exports = router;