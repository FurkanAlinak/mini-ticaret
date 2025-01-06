const jwt = require('jsonwebtoken');
const ERR = require('../util/error');
const User = require('../model/user');
const APIError = require('../util/error');
require('dotenv').config();

const roleCheck = (requiredRoles) => {
    return (req, res, next) => {
        try {
            // Kullanıcı bilgileri token'dan çözüldü
            const userRole = req.user.role;

            // Kullanıcının rolü gereken rollerden biri değilse hata döndür
            if (!requiredRoles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Bu işlemi yapmak için yetkiniz yok.",
                });
            }

            next(); // Role uygun, bir sonraki middleware'e geç
        } catch (error) {
            console.error('Yetkiniz yok:', error.message);
            return res.status(500).json({
                success: false,
                message: "Rol kontrolünde hata oluştu.",
            });
        }
    };
};
module.exports=roleCheck;