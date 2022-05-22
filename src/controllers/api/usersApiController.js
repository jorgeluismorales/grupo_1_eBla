const Users = require('../../models/users');

const PUBLIC_URL = process.env.PUBLIC_URL;

const getAllUsers = async (req, res) => {

    const pageAsNumber = Number.parseInt(req.query.page);
    
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }
    
    const users = await Users.findAndCountAll({
        limit: 5,
        offset: page * 5,
        attributes: {
            exclude: ['password', 'role','image']
        }
    });

    let totalPages = Math.ceil((users.count -1) / 5);

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
    }
    return res.status(200).json({
        users: users.rows,
        count: users.count,
        next,
        previous,
        totalPages: Math.ceil(users.count / 5)
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



module.exports = {
    getUserById,
    getAllUsers
}