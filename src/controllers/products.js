const fs = require("fs");
const Products = require('../models/products');
const Categories = require('../models/categories');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../../public/images/products`;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const createProductView = async (req, res) => {
    const categories = await Categories.findAll();
    res.render('create-product', { categories });
}

const createProductController = async (req, res) => {
    try {
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
        res.redirect('/');
    } catch (e) {
        res.redirect('products/create');

    }
}

const homeController = async (req, res) => {
const user = req.session.user;
console.log(user);
    const products = await Products.findAll();
    res.render('home', { products, toThousand });
}

const detailsController = async (req, res) => {
    const product = await Products.findByPk(req.params.id,
        { include: [{ model: Categories, as: "category" }] }
    );
    res.render('product-detail', { product });
}

const deleteProductController = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findOne({ where: { id } });
    await Products.destroy({ where: { id } });
    res.redirect('/products');
    const { image } = product;
    const fileName = image.split('/products/')[1];
    fs.unlinkSync(`${MEDIA_PATH}/${fileName}`);
}

const editProductController = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findOne({ where: { id } });
    const categories = await Categories.findAll();
    res.render('edit-product', { product, categories });
}

const updateProductController = async (req, res) => {
    /* console.log(req.body);
    console.log('id',req.params.id);
     const { id } = req.params;
    await Products.update({
        ...req.body
    }, { where: { id } }); */
    const { id } = req.params;
    const { file } = req;
    const { name, description, categoryId, price, discount } = req.body;
    const product = await Products.findByPk(id);

    if (!product) {
        return res.redirect('/products');
    }

    if (name) {
        product.name = name
    }
    if (description) {
        product.description = description;
    }
    if (categoryId) {
        product.categoryId = categoryId;
    }
    if (price) {
        product.price = price;
    }
    if (discount) {
        product.discount = discount;
    }
    if (file) {
        product.image = `${PUBLIC_URL}/images/products/${file.filename}`;
    }
    await product.save();
    res.redirect('/products');
}

module.exports = {
    createProductView,
    createProductController,
    homeController,
    detailsController,
    deleteProductController,
    editProductController,
    updateProductController
};