const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require("../helpers/jwt");


const login = async ( req, res = response ) => {

    const { name, password } = req.body; 

    try {

        // Verificar nombre
        const userDB = await User.findOne({ name }); 
        if( !userDB) {
            return res.status(404).json({
                status: false, 
                mgs: 'User no exists'
            })
        }
        // Verificar Contraseña
        const validPassword = bcrypt.compareSync( password, userDB.password )
        if( !validPassword ){
            return res.status(400).json({
                status: false, 
                mgs: 'password no valid'
            });
        }

        // Generar Token
        const token = await generateJWT( userDB.id , userDB.name, userDB.role );
        const role = userDB.role
        res.json({
            status: true, 
            mgs: 'token correct',
            token,
            role
        })
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            status: false, 
            mgs: 'talk to the administrator'
        })
    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );
    res.json({
        status: true,
        token
    });

}

module.exports = {
    login,
    renewToken
}