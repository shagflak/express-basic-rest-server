const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
    const { limit = 10, offset = 0 } = req.query;
    res.json({
        message: "get api resource",
        limit,
        offset
    });
}

const usersPost = (req = request, res = response) => {
    // note: keep in mind that you need to clean the body and guarantee there are not malicious code
    const body = req.body
    res.json({
        message: "post api resource",
        body
    });
}

const usersUpdate = (req = request, res = response) => {
    const id = req.params.id
    res.json({
        message: "update api resource",
        id
    });
}

const usersDelete = (req = request, res = response) => {
    res.send("delete api resource");
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