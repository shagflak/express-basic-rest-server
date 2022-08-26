const { request, response } = require('express');
const User = require('../models/users/users.model');
const bcrypt = require('bcryptjs');

const usersGet = async (req = request, res = response) => {
    const { limit = 10, offset = 0 } = req.query;
    const query = { state: true };

    // note: await returns a promise so you can .then this Promise.all as well
    // By doing all of this with Promise.all we are doing both calls simultaneously rather then one by one.
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(offset)
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async (req = request, res = response) => {
    // note: keep in mind that you need to clean the body and guarantee there are not malicious code
    const { name, email, password, rol } = req.body;

    const user = new User( { name, email, password, rol } );

    // check if email already exists.ackage
    const mailAlreadyRegistered = await User.findOne({ email });
    if (mailAlreadyRegistered) {
        return res.status(400).json({
            message:'The email already exists.'
        });
    }


    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.json({
        user,
    });
}

const usersUpdate = async (req = request, res = response) => {
    const id = req.params.id
    //NOTE: We will remove from the requestData object the password to validate it separately, we don't care 
    // about google value just yet.
    // also this object destructuring mixed with the spread operator is really neat to exclude data on an object.
    const { _id, password, google, ...requestData } = req.body;

    //TODO: Validate id vs DB
    if (password) {
        const salt = bcrypt.genSaltSync();
        requestData.password = bcrypt.hashSync(password, salt);
    }

    const userRB = await User.findByIdAndUpdate(id, requestData);


    res.json({
        message: "update api resource",
        userRB
    });
}

const usersDelete = async (req = request, res = response) => {
    const { id } = req.params;

    // permanent delete
    // const deletedUser = await User.findByIdAndDelete(id);

    // logical delete
    const deletedUser = await User.findByIdAndUpdate(id, { state: false });

    res.json({
        deletedUser
    });
}

const usersPatch = (req = request, res = response) => {
    res.send("`patch` api resource");
}

module.exports = {
    usersGet,
    usersPost,
    usersUpdate,
    usersDelete,
    usersPatch
}