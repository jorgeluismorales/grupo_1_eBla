const {Router} = require('express');
const { usersView, userDetailsController, deleteUserController, editUserController, updateUserController } = require('../controllers/users');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadImage');
const router = Router();

router.get('/',authMiddleware, usersView);

router.get('/:id', userDetailsController);

router.delete('/:id', deleteUserController);

router.get('/edit/:id', editUserController);
router.patch('/update/:id',uploadMiddleware.single('image'), updateUserController);
module.exports = router;