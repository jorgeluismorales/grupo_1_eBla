const { body, validationResult } = require('express-validator');

const handleValidator = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.status(400);
        res.redirect('/products/create');
        //res.json({ errors: err.array() });
    }
}

const createProductValidator = [
    body('name')
        .exists()
        .notEmpty(),
    body('price')
        .exists()
        .notEmpty(),
    body('discount')
        .exists()
        .notEmpty(),
    body('categoryId')
        .exists()
        .notEmpty(),
    body('description')
        .exists()
        .notEmpty(),
    (req, res, next) => {
        return handleValidator(req, res, next)
    }
];

module.exports = createProductValidator;