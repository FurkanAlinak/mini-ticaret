const jwt = require('jsonwebtoken');
const ERR = require('../util/error');
const User = require('../model/user');
require('dotenv').config();

const createToken = async (user, res) => {
    try {
        const payload = {
            id: user._id,
            email: user.email,
        };

        
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('TOKEN KEY bulunamadı');
        }

        // Token oluşturuluyor jwt.sign = token oluşturur
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
        console.error('Error creating token:', error);
        return res.status(500).json({
            success: false,
            message: "Token oluşturulamadı",
            error: error.message
        });
    }
};

const verifyToken = async (req, res, next) => {
    // Token kontrolü
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
    if (!headerToken) {
        throw new ERR("Token Bulunamadı", 401);
    }
    // Token kontrolü devamı...
};

module.exports = {
    createToken,
    verifyToken
};
