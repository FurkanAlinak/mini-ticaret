require('dotenv').config();
const { createToken, verifyToken } = require('../middleware/token');
const User = require('../model/user'); // Kullanıcı modeli çağırıldı
const APIError = require('../util/error');
const axios = require('axios'); // Axios çağrıldı
const bcrypt = require('bcrypt'); // Bcrypt çağrıldı
const Response = require("../util/response");
const jwt = require('jsonwebtoken');
require("body-parser");


// Kullanıcı kayıt işlemi
const register = async (req, res, next) => {
    const { email } = req.body;

    const userCheck = await User.findOne({ email });
    if (userCheck) {
        next(new APIError("Kullanıcı Zaten Kayıtlı Lütfen Giriş Yapmayı Deneyiniz.!!!", 400));
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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // return res.status(400).json({ message: "Email ve şifre gereklidir" });
            next(new APIError("Lütfen E-Mail-Şifrenizi Giriniz", 400));
        }

        const userInfo = await User.findOne({ email });
        if (!userInfo) {
            // return res.status(404).json({ message: "Kullanıcı bulunamadı" });
            next(new APIError("Kullanıcı Bulunamadı Kayıt Olunuz", 400));
        }

        const passwordCheck = await bcrypt.compare(password, userInfo.password);
        if (!passwordCheck) {
            // return res.status(400).json({ message: "Şifre hatalı" });
            next(new APIError("E-Mail Veya Şifre Hatalı", 400));
        }

        createToken(userInfo, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};

const me = async (req, res) => {
    return new Response(req.user).succes(res)
}

const getProfile = async (req, res) => {
    //api/profile authorization : Bearer jwt_token 
    try {
        console.log("Req.user1:", req.user);
        const userId = req.user.id;
        console.log("Kullanıcı ID'si:", userId);
        const user = await User.findById(userId).select("-password"); // şifreyi getirme
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı Bulunurken Hata" });
    }
};

const updatePassword = async (req, res, next) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        // Kullanıcıyı veritabanında arayın
        const user = await User.findOne({ email });
        if (!user) {
            return next(new APIError("Kullanıcı Bulunamadı", 400));
        }

        // Mevcut şifreyi doğrula
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return next(new APIError("Mevcut Şifreniz Yanlış", 400));
        }

        //Yeni şifre eski şifreyle aynı olamaz
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return next(new APIError("Yeni Şifre Eski Şifreyle Aynı Olamaz", 400));
        }

        // Yeni şifreyi hash'le
        const hashPassword = await bcrypt.hash(newPassword, 8);
        user.password = hashPassword;
        await user.save();

        res.status(200).json({ message: "Başarıyla Değiştirildi.." })
    } catch (error) {
        console.error("Şifre Güncellenirken Hata Oluştu: ", error);
        return next(new APIError("Şifre Güncellenirken Hata Oluştu", 500));
    }
};
module.exports = {
    register,
    login,
    me,
    getProfile,
    updatePassword
};
