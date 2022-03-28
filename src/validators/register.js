const { check, validationResult } = require('express-validator');

const handleValidator = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.status(400);
        res.redirect('/register');
        //res.json({ errors: err.array() });
    }
}

const registerValidator = [
    check('firstname')
        .exists()
        .notEmpty(),
    check('lastname')
        .exists()
        .notEmpty(),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty(),
    (req, res, next) => {
        return handleValidator(req, res, next)
    }
];

module.exports = registerValidator;