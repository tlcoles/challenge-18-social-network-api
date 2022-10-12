const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// get all thoughts or create a new one
router.route('/')
    .get(getThoughts)
    .post(createThought);

// find a single thought or delete it via :thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought);

// post or delete reactions to thoughts 
router.route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);

    module.exports = router;