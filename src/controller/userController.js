require('dotenv').config();
const { createToken , verifyToken} = require('../middleware/token');
const User = require('../model/user'); // Kullanıcı modeli çağırıldı
const APIError = require('../util/error');
const axios = require('axios'); // Axios çağrıldı
const bcrypt = require('bcrypt'); // Bcrypt çağrıldı
const Response = require("../util/response");
const jwt = require('jsonwebtoken');

// Kullanıcı kayıt işlemi
const register = async (req, res) => {
    const { email, password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Şifrenizi giriniz" });
    }

    const userCheck = await User.findOne({ email });
    if (userCheck) {
        return res.status(400).json({ message: "Kullanıcı zaten kayıtlı" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 8);
    console.log("Hashlenmiş şifre:", req.body.password);
    const usersave = new User(req.body);
    await usersave.save()
        .then((data) => {
            return new Response(data, "Kullanıcı başarıyla oluşturuldu").created(res);
        })
        .catch((err) => {
            throw new APIError("Kullanıcı oluşturulamadı", 400);
        });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email ve şifre gereklidir" });
        }

        const userInfo = await User.findOne({ email });
        if (!userInfo) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        const passwordCheck = await bcrypt.compare(password, userInfo.password);
        if (!passwordCheck) {
            return res.status(400).json({ message: "Şifre hatalı" });
        }

        createToken(userInfo, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};

module.exports = {
    register,
    login,
};