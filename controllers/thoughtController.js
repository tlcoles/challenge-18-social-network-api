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
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { username: thought.username },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found with that username." })
              : res.json(thought)
          )
          .catch((error) => res.status(500).json(error));
      })
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { runValidators: true, new: true }
    )
      .then(() => res.json({ message: "Thought deleted!" })) // ! Also remove thought from user??
      .catch((error) => res.status(500).json(error));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((error) => res.status(500).json(error));
  },
    // Create a thought's reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res
                        .status(404)
                        .json( { message: 'No thought found with that ID.' })
                    : res.json(thought)
            )
            .catch((error) => res.status(500).json(error));
    },
    // Delete a thoughts's reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res
                        .status(404)
                        .json( { message: 'No thought found with that ID.' })
                    : res.json(thought)
            )
            .catch((error) => res.status(500).json(error));
    },
}