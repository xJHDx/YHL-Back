/**
 * Ruta: /api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controller/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [
    check('name', 'the name is mandatory').not().isEmpty(),
    check('password', 'the password is mandatory').not().isEmpty(),
    validateFields
], login)

router.get( '/renew',
    validateJWT,
    renewToken
)

module.exports = router;