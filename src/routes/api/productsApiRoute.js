const {Router} = require('express');
const { getProducts, getProductById, deleteProductById, createProduct } = require('../../controllers/api/productsApiController');
const uploadProductImage = require('../../middlewares/api/uploadProductImage');
const router = Router();

router.get('/', getProducts );
router.get('/:id', getProductById );
router.delete('/:id', deleteProductById );
router.post('/', uploadProductImage.single('image'), createProduct );

module.exports = router;