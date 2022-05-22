const Products = require('../models/products');
const Op = require('sequelize').Op;

const searchProductController = async (req, res) => {
    const { search } = req.body;
    const products = await Products.findAll({
        where: {
            name: {
                [Op.like]: `%${search}%`
            }
        }
    });
    res.render('home', { products });
}

module.exports =  searchProductController;