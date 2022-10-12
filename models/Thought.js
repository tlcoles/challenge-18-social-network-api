const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },

        // Source: https://stackoverflow.com/questions/70724966/how-to-use-getter-or-setter-with-mongoose-timestamps
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => date.toLocaleDateString('de-DE'),
          },
        username: {
            type: String,
            required: true, 
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
          },
    },
);

// Create a virtual that retrieves length of thought's reactions array on query
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);
module.exports = Thought;