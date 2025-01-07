const jwt = require('jsonwebtoken');
const ERR = require('../util/error');
const User = require('../model/user');
const APIError = require('../util/error');
require('dotenv').config();

const createToken = async (user, res) => {
    try {
        const payload = {
            id: user._id,
            email: user.email,
            role:user.role
            
        };

        
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('TOKEN KEY bulunamadı');
        }

        
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            algorithm: "HS512", // Algoritma
            expiresIn: '1h' // Süre
        }); // Token oluşturuldu

        return res.status(200).json({
            success: true,
            token: token,
            message: "Başarılı Token"
        });
    } catch (error) {
        console.error('Başarısız token:', error);
        return res.status(500).json({
            success: false,
            message: "Token oluşturulamadı",
            error: error.message
        });
    }
};
const verifyToken = async (req, res, next) => {
    try {
        // Authorization Header'dan Bearer Token'ı al
        const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
        if (!headerToken) {
            throw new APIError("Token Bulunamadı", 401);
        }

        // Bearer'dan sonra gelen token kısmını al
        const token = req.headers.authorization.split(" ")[1];

        // Token doğrulama
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Veritabanından kullanıcıyı bul
        const userInfo = await User.findById(decoded.id).select("_id email role name surname");
        if (!userInfo) {
            throw new APIError("Geçersiz Token", 401);
        }

        // Kullanıcı bilgilerini req objesine ekle
        req.user = userInfo;
        next(); // Bir sonraki middleware'e geç
    } catch (error) {
        console.error("Token doğrulama hatası:", error.message);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Token doğrulama sırasında bir hata oluştu",
        });
    }
};




module.exports = {
    createToken,
    verifyToken,
    
};
