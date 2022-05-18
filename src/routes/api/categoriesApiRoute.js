const { Router } = require('express');
const { createCategory, deleteCategory, getAllCategories, updateCategory, getCategoryById } = require('../../controllers/api/categoriesApiController');
const router = Router();

router.get('/', getAllCategories);

router.post('/', createCategory);

router.delete('/:id', deleteCategory);

router.put('/:id', updateCategory);

router.get('/:id', getCategoryById);

module.exports = router;