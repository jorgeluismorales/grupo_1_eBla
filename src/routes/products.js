const {Router} = require('express');
const { createProductController, createProductView, homeController, detailsController, deleteProductController, editProductController, updateProductController } = require('../controllers/products');
const uploadMiddleware = require('../middlewares/uploadImage');
const createProductValidator = require('../validators/products');
const authMiddleware = require('../middlewares/authMiddleware');
const router = Router();

router.get('/create',authMiddleware, createProductView)

router.post('/create',uploadMiddleware.single('image') , createProductValidator,  createProductController);

router.get('/', homeController );

router.get('/:id', detailsController); 

router.delete('/:id', deleteProductController );

router.get('/edit/:id',editProductController); 
router.patch('/update/:id', uploadMiddleware.single('image') , updateProductController); 

module.exports = router;