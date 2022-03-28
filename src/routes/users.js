const {Router} = require('express');
const { usersView, userDetailsController, deleteUserController } = require('../controllers/users');
const router = Router();

router.get('/', usersView);

router.get('/:id', userDetailsController);

router.delete('/:id', deleteUserController);

router.get('/edit/:id', usersView);
router.patch('/edit/:id', usersView);
module.exports = router;