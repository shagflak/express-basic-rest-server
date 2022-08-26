const { Router } = require('express');
const { usersGet, usersPost, usersUpdate, usersDelete, usersPatch } = require('../controllers/users.controller');
const { check } = require('express-validator');
const { userRequestValidator } = require('../middleware/user-request-validator.middleware');
const { 
    isValidUserRole, 
    userEmailAlreadyExists, 
    userIdAlreadyExists 
} = require('../helpers/user-db-validators');

const router = new Router();

// the routes url doesn't need to be defined here those are going to be defined in the server.js 
// to be defined on a single line
// example: this.app.use('/api/users', userRoutes);
// this way we cover all the routes related to the REST endpoints of this.
router.get('/', usersGet);

router.post('/',
// the following array is middleware to collect errors that can be validated within the usersPost handler
[
    check('name', 'Name cannot be empty.').not().isEmpty(),
    check('email', 'Invalid Email.').isEmail(),
    check('email', 'The email is already registered..').custom(
        userEmailAlreadyExists
    ),
    check('password', 'Password is required and with a minimum length of 6 characters..').not().isEmpty().isLength({ min: 6 }),
    // NOTE: Do this if you want to do a validation against hardcoded data.
    // check('rol', 'Invalid role name.').not().isEmpty().isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol', 'Invalid role name.').custom(
        isValidUserRole
    ),
    userRequestValidator,
] , usersPost);

router.put('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id', 'Id Does not exist').custom(userIdAlreadyExists),
    check('rol', 'Invalid role name.').custom(
        isValidUserRole
    ),
    userRequestValidator
    
], usersUpdate);

router.delete('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id', 'Id Does not exist').custom(userIdAlreadyExists),
    userRequestValidator
], usersDelete);

router.patch('/', usersPatch);

module.exports = router;