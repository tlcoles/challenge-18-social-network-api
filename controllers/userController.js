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
        User.findOne({ _id: req.params.userId })
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

    // Delete a user by ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID'})
                    : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: 'User and their thoughts deleted!' }))
            .catch((error) => res.status(500).json(error));
    },

    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body }, 
            { runValidators: true, new: true }, 
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this ID.' })
                    : res.json(user)
            )
            .catch((error) => res.status(500).json(error));
    },
    // Create a user's friend
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId} },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json( { message: 'No user found with that ID.' })
                    : res.json(user)
            )
            .catch((error) => res.status(500).json(error));
    },
    // Delete a user's friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json( { message: 'No user found with that ID.' })
                    : res.json(user)
            )
            .catch((error) => res.status(500).json(error));
    },
};
