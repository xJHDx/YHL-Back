const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require("../helpers/jwt");

const GetUser = async (req, res) => {

    const user = await User.find({}, 'name role');

    res.json({
        ok: true,
        mgs: 'Get User',
        user
    })
}

const CreateUser = async (req, res = response) => {

    const { name, password } = req.body;

    try {
        const existeName = await User.findOne({ name });

        if (existeName) {
            return res.status(400).json({
                ok: false,
                mgs: 'Error creating user name exists'
            })
        }

        const user = new User(req.body);

        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password);
      
        // Guardar usuario
        await user.save();        
            
        // Generar Token
        const token = await generateJWT( user.id , user.name );

        res.json({
            ok: true,
            mgs: 'User Create',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Error an create user'
        });
    }

}

const UpdateUser = async (req, res = response) => {

    // TODO: validar token y comprobar el usuario esta correcto

    const _id = req.params.id;

    try {
        const userDB = await User.findById(_id);
        if (!userDB) {
            return res.status(404).json({
                status: false,
                mgs: 'No Exists an user name for ID'
            });
        }

        // Actualizaciones
        const fields = req.body;
        if (userDB.name === req.body.name) {
            delete fields.name;
        } else {
            const existsName = await User.findOne({ name: req.body.name });
            if (existsName) {
                return res.status(400).json({
                    status: false,
                    mgs: 'user already exists'
                })
            }
        }

        // Encriptar nueva contraseña 
        const salt = bcrypt.genSaltSync();
        fields.password = bcrypt.hashSync(fields.password);

        const userUpdate = await User.findByIdAndUpdate(_id, fields, { new: true });

        res.json({
            status: true,
            User_Update: userUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            mgs: 'Error update user'
        })
    }
}

const DeleteUser = async (req, res = response) => {

    const _id = req.params.id;

    try {
        const userDB = await User.findById(_id);
        if (!userDB) {
            return res.status(404).json({
                status: false,
                mgs: 'No Exists an user name for ID'
            });
        }
        await User.findByIdAndDelete(_id);

        res.json({
            status: true,
            User_Delete: 'Delete User',
            _id
        });     

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: true,
            mgs: "User not Delete, contac admin"
        }); 
    }
}

module.exports = {
    GetUser,
    CreateUser,
    UpdateUser,
    DeleteUser
}