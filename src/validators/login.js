const { body, validationResult } = require('express-validator');

const handleValidator = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.status(400);
        res.redirect('/login');
        //res.json({ errors: err.array() });
    }
}

const validatorLogin = [
    body("password")
    .exists()
    .notEmpty(),
    body("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return handleValidator(req, res, next)
    }
];

module.exports = validatorLogin;