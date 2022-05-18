const {Router} = require('express');
const { getProducts, getProductById } = require('../../controllers/api/productsApiController');
const router = Router();

router.get('/', getProducts );

router.get('/:id', getProductById );


module.exports = router;