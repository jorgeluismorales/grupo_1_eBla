const fs = require("fs");
const Users = require('../models/users');
const { encrypt } = require("../utils/handlePassword");

const MEDIA_PATH = `${__dirname}/../../public/images/users`;
const PUBLIC_URL = process.env.PUBLIC_URL;

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

const editUserController = async (req, res) => {
    const { id } = req.params;
    const user = await Users.findByPk(id,
        {
            attributes: {
                exclude: ['password']
            }
        });
    console.log(user);
    res.render('edit-user', { user });
}

const updateUserController = async (req, res) => {
    const { id } = req.params;
    const { file } = req;
    const { firstname, lastname, email, password } = req.body;
    const passwordEncrypt = await encrypt(password);
    const user = await Users.findByPk(id);

    if (!user) {
        return res.redirect('/users');
    }

    if (firstname) {
        user.firstname = firstname
    }
    if (lastname) {
        user.lastname = lastname
    }
    if (email) {
        user.email = email;
    }
    if (password) {
        user.password = passwordEncrypt;
    }
    if (file) {
        user.image = `${PUBLIC_URL}/images/users/${file.filename}`;
    }
    await user.save();
    res.redirect('/users');
}

module.exports = {
    usersView,
    userDetailsController,
    deleteUserController,
    editUserController,
    updateUserController
}