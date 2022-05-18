const fs = require("fs");
const Users = require('../models/users');

const MEDIA_PATH = `${__dirname}/../../public/images/users`;

const usersView = async (req, res) => {
    const users = await Users.findAll(
        {
            attributes: {
                exclude: ['password', 'role']
            }
        }
    );
    res.render('users', { users });
}

const userDetailsController = async (req, res) => {
    const user = await Users.findByPk(req.params.id,
        {
            attributes: {
                exclude: ['password', 'role']
            }
        });;
    res.render('user-detail', { user });
}

const deleteUserController = async (req, res) => {
    const { id } = req.params;
    const user = await Users.findOne({ where: { id } });
    await Users.destroy({ where: { id } });
    res.redirect('/users');
    const { image } = user;
    const fileName = image.split('/users/')[1];
    fs.unlinkSync(`${MEDIA_PATH}/${fileName}`);
}

module.exports = {
    usersView,
    userDetailsController,
    deleteUserController
}