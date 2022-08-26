const Role = require('../models/roles/roles.model');
const User = require('../models/users/users.model');

const isValidUserRole = async (rol = '') => {
    const doesRolExist = await Role.findOne({ rol });
    if (!doesRolExist) {
        throw new Error(`The role ${role} is not defined on the DB.-`);
    }
}

const userEmailAlreadyExists = async (email = '') => {
    const doesEmailExist = await User.findOne({ email });
    if (doesEmailExist) {
        throw new Error(`The email ${email} is already registered.`);
    }
}

const userIdAlreadyExists = async (id) => {
    const doesIDExist = await User.findById(id);
    if (!doesIDExist) {
        throw new Error(`The id ${id} does not exist.`);
    }
}

module.exports = {
    isValidUserRole,
    userEmailAlreadyExists,
    userIdAlreadyExists
};