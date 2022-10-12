const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((error) => res.status(500).json(error));
    },
    // Get single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userID })
        .select('-__v')
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user found matching that ID!'})
            : res.json(user)
            )
            .catch((error) => res.status(500).json(error));
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((error) => res.status(500).json(error));
    },
}
