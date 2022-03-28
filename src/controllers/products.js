const fs = require("fs");
const Products = require('../models/products');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../../public/images/products`;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const createProductView = (req, res) => {
    res.render('create-product');
}

const createProductController = async (req, res) => {
    try {
        const { file } = req;
        const { name, price, discount, category, description } = req.body;
        await Products.create({
            name,
            price,
            discount,
            category,
            image: `${PUBLIC_URL}/images/products/${file.filename}`,
            description
        });
        res.redirect('/');
    } catch (e) {
        res.redirect('products/create');

    }
}

const homeController = async (req, res) => {
    const products = await Products.findAll();
    res.render('home', { products, toThousand });
}

const detailsController = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findOne({ where: { id } });
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
    res.render('edit-product', { product });
}

const updateProductController = async (req, res) => {
    const {id} = req.params;
    const products = await Products.findAll();
    let productToUpdate = await Products.findOne({where: {id}});
   
    productToUpdate ={ 
        id: productToUpdate.id,
        ...req.body,
        image: productToUpdate.image
    }
    let newProducts = products.map(product => {
        if(product.id === id){
            return product ={...productToUpdate}
        }
        return product
    })
    await Products.update(newProducts, {where: {id}});
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