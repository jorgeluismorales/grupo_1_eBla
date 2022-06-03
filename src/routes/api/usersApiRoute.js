const {Router} = require('express');
const { getAllUsers, getUserById, deleteUserById, createUser, updateUser } = require('../../controllers/api/usersApiController');
const uploadUserImage = require('../../middlewares/api/uploadUserImage');
const router = Router();

router.get('/', getAllUsers );
router.get('/:id', getUserById );
router.delete('/:id', deleteUserById );
router.post('/', uploadUserImage.single('image'), createUser );
router.patch('/:id', uploadUserImage.single('image'), updateUser );


module.exports = router;