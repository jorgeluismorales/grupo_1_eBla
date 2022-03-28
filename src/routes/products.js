const {Router} = require('express');
const { createProductController, createProductView, homeController, detailsController, deleteProductController, editProductController, updateProductController } = require('../controllers/products');
const uploadMiddleware = require('../middlewares/uploadImage');
const createProductValidator = require('../validators/products');
const router = Router();

router.get('/create', createProductView)

router.post('/create',uploadMiddleware.single('image') , createProductValidator,  createProductController);

router.get('/', homeController );

router.get('/:id', detailsController); 

router.delete('/:id', deleteProductController );

router.get('/edit/:id',editProductController); 
router.patch('/edit/:id', updateProductController); 

module.exports = router;