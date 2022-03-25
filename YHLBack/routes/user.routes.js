/**
 * Ruta: /api/user
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { 
    GetUser, 
    CreateUser, 
    UpdateUser, 
    DeleteUser 
} = require('../controller/user.controller');

const router = Router();

router.get('/', validateJWT , GetUser);

router.post('/', [
    check('name', 'the name is mandatory').not().isEmpty(),
    check('password', 'the password is mandatory').not().isEmpty(),
    validateFields
], CreateUser);

router.put('/:id', [
    validateJWT,
    check('name', 'the name is mandatory').not().isEmpty(),
    check('password', 'the password is mandatory').not().isEmpty(),
    check('role', 'the role is mandatory').not().isEmpty(),
    validateFields
], UpdateUser);

router.delete('/:id', validateJWT, DeleteUser);

module.exports = router;