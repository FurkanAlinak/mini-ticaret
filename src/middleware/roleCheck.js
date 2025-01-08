const jwt = require('jsonwebtoken');
const User = require('../model/user');
const APIError = require('../util/error');
const Response = require('../util/response');
require('dotenv').config();

const roleCheck = (requiredRoles) => {
    return (req, res, next) => {
        console.log("roleCheck çalışıyor...");
        try {
            // Kullanıcı bilgileri token'dan çözüldü
            const userRole = req.user.role;

            // Kullanıcının rolü gereken rollerden biri değilse hata döndür
            if (!requiredRoles.includes(userRole)) {
                const error = new APIError("Yetkiniz yok.", 403);
                return next(error); 
            }
            console.log("Kullanıcı rolü:", userRole);
            next(); 
        } catch (error) {
            console.error('Rol kontrolünde hata:', error.message);
            return next(new APIError("Rol kontrolünde server hatası oluştu.", 500));
        }
    };
};

module.exports = roleCheck;