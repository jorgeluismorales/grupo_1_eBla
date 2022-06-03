const fs = require("fs");
const Users = require('../../models/users');
const { encrypt } = require('../../utils/handlePassword');

const PUBLIC_URL = process.env.PUBLIC_URL;

const MEDIA_PATH = `${__dirname}/../../public/images/users`;

const getAllUsers = async (req, res) => {

    /*     const pageAsNumber = Number.parseInt(req.query.page);
        
        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        } */

    const users = await Users.findAndCountAll({
        /*         limit: 5,
                offset: page * 5, */
        attributes: {
            exclude: ['password', 'role', 'image']
        }
    });

    /*     let totalPages = Math.ceil((users.count -1) / 5);
    
        let next= null;
        if(page < totalPages){
            next = `${PUBLIC_URL}/api/users?page=${page + 1}`;
        }else{
            next = null;
        }
    
        let previous = null;
        if(page != 0 && page <= totalPages){
            previous = `${PUBLIC_URL}/api/users?page=${page - 1}`;
        }else{
            previous = null;
        } */
    return res.status(200).json({
        users: users.rows,
        count: users.count,
        /*         next,
                previous,
                totalPages: Math.ceil(users.count / 5) */
    });
}

const getUserById = async (req, res) => {
    const user = await Users.findByPk(req.params.id,
        {
            attributes: {
                exclude: ['password', 'role', 'detail']
            }
        });
    return res.status(200).json(user);
}

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    /*     const user = await Users.findByPk(id); */
    await Users.destroy({ where: { id } });
    /*     const { image } = user;
        const fileName = image.split('/users/')[1];
        fs.unlinkSync(`${MEDIA_PATH}/${fileName}`); */
}

const createUser = async (req, res) => {

    try {
        const { file } = req;
        const { firstname, lastname, email, password, role } = req.body;
        const passwordEncrypt = await encrypt(password);
        const newUser = await Users.create({
            firstname,
            lastname,
            email,
            password: passwordEncrypt,
            image: `${PUBLIC_URL}/images/users/${file.filename}`,
            role: role
        });
        newUser.detail = `${PUBLIC_URL}/api/users/${newUser.id}`;
        newUser.save();
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { file } = req;
    const { firstname, lastname, email, password, role } = req.body;
    const passwordEncrypt = await encrypt(password);
    const user = await Users.findByPk(id);
    if (user) {
        await Users.update({
            firstname,
            lastname,
            email,
            password: passwordEncrypt,
            role,
            image: `${PUBLIC_URL}/images/users/${file.filename}`
        }, {
            where: { id }
        });
        return res.status(200).json({
            message: 'User updated'
        });
    } else {
        return res.status(404).json({
            message: 'User not found'
        });
    }
}


module.exports = {
    getUserById,
    getAllUsers,
    deleteUserById,
    createUser,
    updateUser
}