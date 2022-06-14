const Categories = require('../../models/categories');
const Products = require('../../models/products');

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
    const products = await Products.findAll({
        include: [{
            model: Categories,
            as: "category",
            attributes: ['categoryName']
        }],
        attributes: {
            exclude: ['categoryId']
        }
    });
    const categoriesCount = {};
    products.forEach(product => {
        !categoriesCount[product.category.categoryName] ? categoriesCount[product.category.categoryName] = 1 : categoriesCount[product.category.categoryName]++;
    })

    const categoriesEntries = Object.entries(categoriesCount);
    function random_rgba() {
        return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    }
    const datasets = categoriesEntries.map(category => {
        return {
            label: category[0],
            data: [category[1]],
            backgroundColor: random_rgba()
        }
    })
    const labels = ['Categories'];
    const data = {
        labels,
        datasets
    }
    return res.json({
        categories,
        data,
        count: categories.length
    });
}

const getCategoryById = async (req, res) => {
    const category = await Categories.findByPk(req.params.id);
    return res.json(category);
}

const updateCategory = async (req, res) => {
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