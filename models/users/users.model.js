const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'NaPassword is required.']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

//NOTE: excluding some properties when the object is printed (on a the response for example) to avoid displaying "__v" and "password"
// toJSON is invoked when you try to print the object.
UserSchema.methods.toJSON = function() {
    // NOTE: Using deconstruction feature combined with spread operator to isolate properties on a new object, pretty neat!.
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema)
