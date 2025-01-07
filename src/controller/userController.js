require('dotenv').config();
const { createToken, verifyToken } = require('../middleware/token');
const User = require('../model/user'); // Kullanıcı modeli çağırıldı
const APIError = require('../util/error');
const axios = require('axios'); // Axios çağrıldı
const bcrypt = require('bcrypt'); // Bcrypt çağrıldı
const Response = require("../util/response");
const jwt = require('jsonwebtoken');

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
    try {
        const userId = req.user.id;
        const user = await User.findById({ userId }).select("-password")
        if (!user) {
            res.status(404).json({ message: "Kullanıcı Bulunamadı" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "Kullanıcı Bulunurken Hata" });
    }
}

const updatePassword = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(userId);
       
        if (!user) {
            return next(new APIError("Kullanıcı Bulunamadı", 400));
        }
        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        console.log(`Şifre eşleşmesi: ${isMatch}`);
        if (!isMatch) {
            return next(new APIError("Mevcut Şifreniz Yanlış", 400));
        }
     
        const hashPassword = await bcrypt.hash(newPassword, 10);
        console.log("Burda:" ,hashPassword)
        user.password = hashPassword;
        await user.save();
        return new Response(null, "Şifre Başarıyla Değiştirildi").success(res);
    } catch (error) {
        return next(new APIError("Şifre Güncellenirken Hata Oluştu", 500));
    }
}

module.exports = {
    register,
    login,
    me,
    getProfile,
    updatePassword
};
