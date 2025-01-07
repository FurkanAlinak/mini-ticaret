const joi = require('joi');
const APIError = require('../util/error');
const { body } = require('express-validator');


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
                    role: joi.string()
                })
                .validateAsync(req.body);
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400)); // Özelleştirilmiş hata mesajı
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
                            'string.base': 'E-Mail Alanı Normal Metin Olmalıdır (,.!* Karakterleri girmeyin)',
                            'string.empty': 'E-Mail Alanı Boş Olamaz',
                            'string.max': 'E-Mail Alanı Max 25 karakterli olmalı',
                            'string.email': 'Lütfen Geçerli Bir E-mail Giriniz',
                            'string.min': 'E-Mail Alanı Min 2 karakterli olmalı',
                            'string.required': 'E-Mail Alanı Zorunludur',
                        }),
                    password: joi
                        .string().min(6).max(20).required().messages({
                            'string.base': 'Şifre Alanı Normal Metin Olmalıdır (,.!* Karakterleri girmeyin)',
                            'string.empty': 'Şifre Alanı Boş Olamaz',
                            'string.max': 'Şifre Alanı Max 20 karakterli olmalı',
                            'string.min': 'Şifre Alanı Min 6 karakterli olmalı',
                            'string.required': 'Şifre Alanı Zorunludur',
                        }),
                })
                .validateAsync(req.body);
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400)); // Hata nesnesini ilet
            }
            return next(new APIError('Lütfen Validasyon Kurallarına Uyun', 400));
        }
        next();
    };

    static upgradePassword = async (req, res) => {
        try {
            await joi
                .object({
                    newpassword: joi
                        .string.min(6).max(20).required().message({
                            'string.base': 'Yeni Şifre Alanı Normal Metin Olmalıdır (,.!* Karakterleri girmeyin)',
                            'string.empty': 'Yeni Şifre Alanı Boş Olamaz',
                            'string.max': 'Yeni Şifre Alanı Max 20 karakterli olmalı',
                            'string.min': 'Yeni Şifre Alanı Min 6 karakterli olmalı',
                            'string.required': 'Yeni Şifre Alanı Zorunludur',
                        })
                })
        } catch (error) {
        }
    }
}
module.exports = { validatePasswordUpdate };

module.exports = Validation;
