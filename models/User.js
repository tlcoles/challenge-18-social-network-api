const { Schema, model } = require('mongoose');

// Validate email. Source: https://thewebdev.info/2022/03/16/how-to-validate-email-syntax-with-mongoose/#:~:text=To%20validate%20email%20syntax%20with%20Mongoose%2C%20we%20can%20set%20the,%40%5Cw%2B(%5B%5C.
const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required.',
            validate: [validateEmail, 'Please provide a valid email address.'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address.',
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        // Self-reference the User model
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
); 

// Create a virtual that retrieves length of user's friends array on query
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);
module.exports = User;