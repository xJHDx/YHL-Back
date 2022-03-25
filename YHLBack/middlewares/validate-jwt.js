const { response } = require('express');
const jwt = require('jsonwebtoken')

const validateJWT = (req, res = require, next) => {

    // leer el token
    const token = req.header('token');

    if( !token ){
        return res.status(401).json({
            status: false, 
            mgs: 'No token in the petition'
        });
    }
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req._id = _id
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            mgs: 'Token no Valid' 
        })
    }    
}

module.exports = {
    validateJWT
}