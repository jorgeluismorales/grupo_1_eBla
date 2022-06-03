const {Router} = require('express');
const { login } = require('../../controllers/api/authApiController');
const router = Router();

router.post('/', login)

module.exports = router;