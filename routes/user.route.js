const { Router } = require('express');
const { usersGet, usersPost, usersUpdate, usersDelete, usersPatch } = require('../controllers/users.controller');

const router = new Router();

// the routes url doesn't need to be defined here those are gping to be defined in the server.js 
// to be defined on a single line
// example: this.app.use('/api/users', userRoutes);
// this way we cover all the routes related to the REST endpoints of this.
router.get('/', usersGet);

router.post('/', usersPost);

router.put('/:id', usersUpdate);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;