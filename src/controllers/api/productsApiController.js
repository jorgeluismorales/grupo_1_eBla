const Products = require('../../models/products');
const Categories = require('../../models/categories');

const PUBLIC_URL = process.env.PUBLIC_URL;

const getProducts = async (req, res) => {

    /*     const pageAsNumber = Number.parseInt(req.query.page);
    
        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        } */

    const categoriesCount = {};
    const products = await Products.findAndCountAll({
        /*         limit: 5,
                offset: page * 5, */
        include: [{
            model: Categories,
            as: "category",
            attributes: ['categoryName']
        }],
        attributes: {
            exclude: ['categoryId']
        }
    });

    /* let totalPages = Math.ceil(products.count / 5);

    let next = null;
    if (page < totalPages) {
        next = `${PUBLIC_URL}/api/products?page=${page + 1}`;
    } else {
        next = null;
    }

    let previous = null;
    if (page != 0 && page <= totalPages) {
        previous = `${PUBLIC_URL}/api/products?page=${page - 1}`;
    } else {
        previous = null;
    } */


    products.rows.forEach(product => {
        !categoriesCount[product.category.categoryName] ? categoriesCount[product.category.categoryName] = 1 : categoriesCount[product.category.categoryName]++;
    })
    return res.status(200).json({
        products: products.rows,
        count: products.count,
        categoriesCount: categoriesCount,
        /*         next,
                previous,
                totalPages */
    });
}

const getProductById = async (req, res) => {
    const product = await Products.findByPk(req.params.id,
        {
            include: [{
                model: Categories,
                as: "category",
                attributes: ['categoryName']
            }],
            attributes: {
                exclude: ['categoryId']
            }
        });
    return res.status(200).json(product);
}

const deleteProductById = async (req, res) => {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }
    await product.destroy();
    return res.status(200).json({
        message: 'Product deleted'
    });
}

const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const { file } = req;
        const { name, description, categoryId, price, discount } = req.body;
        const newProduct = await Products.create({
            name,
            description,
            image: `${PUBLIC_URL}/images/products/${file.filename}`,
            categoryId,
            price,
            discount,

        });
        newProduct.detail = `${PUBLIC_URL}/api/products/${newProduct.id}`;
        newProduct.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
}

module.exports = {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct
}