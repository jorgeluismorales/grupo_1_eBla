const {Router} = require('express');
const { getProducts, getProductById, deleteProductById, createProduct, updateProduct } = require('../../controllers/api/productsApiController');
const uploadProductImage = require('../../middlewares/api/uploadProductImage');
const router = Router();

router.get('/', getProducts );
router.get('/:id', getProductById );
router.delete('/:id', deleteProductById );
router.post('/', uploadProductImage.single('image'), createProduct );
router.patch('/:id', uploadProductImage.single('image'), updateProduct );

module.exports = router;