const Categories = require('../../models/categories');

const createCategory = async (req, res) => {
    const { categoryName } = req.body;
    const newCategory = new Categories({ categoryName });
    await newCategory.save();
    return res.json({ message: 'Category created' });
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Categories.destroy({ where: { id } });
    return res.json({ message: 'Category deleted' });
}

const getAllCategories = async (req, res) => {
    const categories = await Categories.findAll();
    return res.json(categories);
}

const getCategoryById = async (req, res) => {
    const category = await Categories.findByPk(req.params.id);
    return res.json(category);
}

const updateCategory = async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const { id } = req.params;
    const { categoryName } = req.body;
    await Categories.update({ categoryName }, { where: { id } });
    return res.json({ message: 'Category updated' });
}


module.exports = {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
    getCategoryById
}