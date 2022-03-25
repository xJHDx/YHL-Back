const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String, 
        require: true,
        unique: true
    }, 
    password:{
        type: String, 
        require: true
    },
    role:{
        type: String,
        require: true, 
        default: 'USER_ROLE'
    }
});

module.exports = model('user', UserSchema );