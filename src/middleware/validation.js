const joi = require('joi');
const APIError = require('../util/error');

class Validation {
    static register = async (req, res, next) => {
        try {
            await joi
                .object({
                    name: joi.string().min(2).max(10).required().messages({
                        "string.base": "İsim alanı metin olmalıdır.",
                        "string.empty": "İsim alanı boş bırakılamaz.",
                        "string.min": "İsim alanı en az 2 karakter olmalıdır.",
                        "string.max": "İsim alanı en fazla 10 karakter olmalıdır.",
                        "any.required": "İsim alanı zorunludur.",
                    }),
                    surname: joi.string().min(2).max(15).required().messages({
                        "string.base": "Soyad alanı metin olmalıdır.",
                        "string.empty": "Soyad alanı boş bırakılamaz.",
                        "string.min": "Soyad alanı en az 2 karakter olmalıdır.",
                        "string.max": "Soyad alanı en fazla 15 karakter olmalıdır.",
                        "any.required": "Soyad alanı zorunludur.",
                    }),
                    email: joi.string().email().required().messages({
                        "string.base": "E-posta alanı metin olmalıdır.",
                        "string.empty": "E-posta alanı boş bırakılamaz.",
                        "string.email": "Geçerli bir e-posta adresi giriniz.",
                        "any.required": "E-posta alanı zorunludur.",
                    }),
                    password: joi.string().min(6).max(20).required().messages({
                        "string.base": "Şifre alanı metin olmalıdır.",
                        "string.empty": "Şifre alanı boş bırakılamaz.",
                        "string.min": "Şifre alanı en az 6 karakter olmalıdır.",
                        "string.max": "Şifre alanı en fazla 20 karakter olmalıdır.",
                        "any.required": "Şifre alanı zorunludur.",
                    }),
                    role: joi.string(),
                })
                .validateAsync(req.body);
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400));
            }
            return next(new APIError('Lütfen validasyon kurallarına uyun.', 400));
        }
        next();
    };

    static login = async (req, res, next) => {
        try {
            await joi
                .object({
                    email: joi
                        .string().email().trim().min(2).max(25).required().messages({
                            'string.base': 'E-Mail alanı metin olmalıdır.',
                            'string.empty': 'E-Mail alanı boş bırakılamaz.',
                            'string.max': 'E-Mail alanı en fazla 25 karakter olabilir.',
                            'string.email': 'Geçerli bir e-posta adresi giriniz.',
                            'string.min': 'E-Mail alanı en az 2 karakter olmalıdır.',
                            'any.required': 'E-Mail alanı zorunludur.',
                        }),
                    password: joi
                        .string().min(6).max(20).required().messages({
                            'string.base': 'Şifre alanı metin olmalıdır.',
                            'string.empty': 'Şifre alanı boş bırakılamaz.',
                            'string.max': 'Şifre alanı en fazla 20 karakter olabilir.',
                            'string.min': 'Şifre alanı en az 6 karakter olmalıdır.',
                            'any.required': 'Şifre alanı zorunludur.',
                        }),
                })
                .validateAsync(req.body);
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400));
            }
            return next(new APIError('Lütfen validasyon kurallarına uyun.', 400));
        }
        next();
    };

    static upgradePassword = async (req, res, next) => {
        try {
            await joi
            .object({
                email: joi
                        .string().email().trim().min(2).max(25).required().messages({
                            'string.base': 'E-Mail alanı metin olmalıdır.',
                            'string.empty': 'E-Mail alanı boş bırakılamaz.',
                            'string.max': 'E-Mail alanı en fazla 25 karakter olabilir.',
                            'string.email': 'Geçerli bir e-posta adresi giriniz.',
                            'string.min': 'E-Mail alanı en az 2 karakter olmalıdır.',
                            'any.required': 'E-Mail alanı zorunludur.',
                        }),
                currentPassword: joi
                    .string().min(6).max(20).required().messages({
                        'string.base': 'Mevcut şifre alanı metin olmalıdır.',
                        'string.empty': 'Mevcut şifre alanı boş bırakılamaz.',
                        'string.max': 'Mevcut şifre alanı en fazla 20 karakter olabilir.',
                        'string.min': 'Mevcut şifre alanı en az 6 karakter olmalıdır.',
                        'any.required': 'Mevcut şifre alanı zorunludur.',
                    }),
                newPassword: joi
                    .string().min(6).max(20).required().messages({
                        'string.base': 'Yeni şifre alanı metin olmalıdır.',
                        'string.empty': 'Yeni şifre alanı boş bırakılamaz.',
                        'string.max': 'Yeni şifre alanı en fazla 20 karakter olabilir.',
                        'string.min': 'Yeni şifre alanı en az 6 karakter olmalıdır.',
                        'any.required': 'Yeni şifre alanı zorunludur.',
                    }),
            })
                .validateAsync(req.body);
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400));
            }
            return next(new APIError('Lütfen validasyon kurallarına uyun.', 400));
        }
        next();
    };
}

module.exports = Validation;
