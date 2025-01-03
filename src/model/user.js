const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },//kullanıcı adı
    surname: {
        type: String,
        required: true,
        trim: true
    },//kullanıcı soyadı
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },//kullanıcı email
    password: {
        type: String,
        required: true,
        trim: true
    },//kullanıcı şifre
    role: {
        type: String,
        default: "user"
    }//kullanıcı rolü
},{collection:"users",timestamps:true});//tablo adı ve tarih alanı

const User = mongoose.model('User', userSchema);

module.exports = User;
