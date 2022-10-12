const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((error) => res.status(500).json(error));
    },
    // Get single thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought found matching that ID!'})
            : res.json(thought)
            )
            .catch((error) => res.status(500).json(error));
    },
}