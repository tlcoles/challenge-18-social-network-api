const router = require('express').Router();

//! I am uncertain about getSingleUser because of this "a single user by its _id and populated thought and friend data"
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController.js');

// /api/users
router.router('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userID
router.route('/:userID')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;