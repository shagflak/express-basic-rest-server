const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'Role is required.']
    }
});

// Always remember that regardless you define your collection in plural you always have to invoke 
// your collection here with a capital letter then the rest of the name without plural.
module.exports = model("Role", RoleSchema);
