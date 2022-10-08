const router = require('express').Router();

//! I am uncertain about getSingleUser because of this "a single user by its _id and populated thought and friend data"
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userController.js');

// retrieve all users or create a new one via /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// retrieve, update, or delete single user via /user/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// add a friend or remove a friend via /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;