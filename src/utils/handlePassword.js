const bcryptjs = require("bcryptjs");

const encrypt = async (psswrd) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(psswrd, salt)
    return hash
};

const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
};

module.exports = { encrypt, compare };