const Users = require('../models/users');
const { encrypt } = require('../utils/handlePassword');

const PUBLIC_URL = process.env.PUBLIC_URL;

const registerView = (req, res) => {
    res.render('register-form');
}

const registerController = async (req, res) => {
    try {
        const { file } = req;
        console.log(file)
        const { firstname, lastname, email, password } = req.body;
        const passwordEncrypt = await encrypt(password);
       const newUser = await Users.create({
            firstname,
            lastname,
            email,
            password: passwordEncrypt,
            image: `${PUBLIC_URL}/images/users/${file.filename}`
        });
        newUser.detail = `${PUBLIC_URL}/api/users/${newUser.id}`;
        newUser.save();
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
}

module.exports = { registerView, registerController };