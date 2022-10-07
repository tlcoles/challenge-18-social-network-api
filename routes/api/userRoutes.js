const router = require('express').Router();

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