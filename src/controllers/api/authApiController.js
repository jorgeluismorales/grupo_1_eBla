const { compare } = require("../../utils/handlePassword");
const { tokenSign } = require("../../utils/handleJwt");

const Users = require('../../models/users');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const hashPassword = user.get('password');

        const check = await compare(password, hashPassword);

        if (!check) {
            return res.status(401).json({
                message: "Password incorrect"
            });
        } else if (user.role === 'admin') {
            const data = {
                token: await tokenSign(user),
            };
            return res.status(200).json(data);
        } else {
            return res.status(401).json({
                message: "You are not admin"
            });
        }

    } catch (error) {

    }
}



module.exports = {
    login
}