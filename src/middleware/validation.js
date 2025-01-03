const joi = require('joi');
const ERR = require('../util/error');

class Validation {
    constructor(){}
    static register = async ( req,res,next)=>{
        try {
            await joi.object({
                name:joi.string().trim().min(2).max(10).required().messages({
                    "string.base":"İsim Alanı Normal Metin Olmalıdır(,.!* Karakterleri girmeyin)",
                    "string.empty":"İsim Alanı Boş Olamaz",
                    "string.max":"İsim Alanı Max 10 karaketerli olmalı",
                    "string.min":"İsim alanı min 2 karakterli olmalı",
                    "string.required":"İsim alanı zorunludur"
                }),
                surname:joi.string().trim().min(2).max(15).required().messages({
                    "string.base":"İsim Alanı Normal Metin Olmalıdır(,.!* Karakterleri girmeyin)",
                    "string.empty":"İsim Alanı Boş Olamaz",
                    "string.max":"İsim Alanı Max 15 karaketerli olmalı",
                    "string.min":"İsim alanı min 2 karakterli olmalı",
                    "string.required":"Soyad alanı zorunludur"
                }),
                email:joi.string().email().trim().min(2).max(25).required().messages({
                    "string.base":"E-Mail Alanı Normal Metin Olmalıdır(,.!* Karakterleri girmeyin)",
                    "string.empty":"E-Mail Alanı Boş Olamaz",
                    "string.max":"E-Mail Alanı Max 25 karaketerli olmalı",
                    "string.email":"Lütfen Geçerli Bir E-mail Giriniz",
                    "string.min":"E-Mail alanı min 2 karakterli olmalı",
                    "string.required":"E-Mail alanı zorunludur"
                }),
                password:joi.string().trim().min(6).max(20).required().messages({
                    "string.base":"Şifreniz Alanı Normal Metin Olmalıdır(,.!* Karakterleri girmeyin)",
                    "string.empty":"Şifreniz Alanı Boş Olamaz",
                    "string.max":"Şifreniz Alanı Max 20 karaketerli olmalı",
                    "string.min":"Şifreniz alanı min 6 karakterli olmalı",
                    "string.required":"Şifreniz alanı zorunludur"
                })
            }).validateAsync(req.body)
            
        } catch (error) {
           if(error.details && error ?.details[0].message)
            throw new ERR(error.details[0].message, 400)
        else throw new ERR("Lütfen Validasyon kurallarına uyun")
            
        }
        next();
    }
    
    static login = async (req,res,next)=>{
        try {
            await joi.object({
                email:joi.string().email().trim().min(2).max(25).required().messages({
                    "string.base":"E-Mail Alanı Normal Metin Olmalıdır(,.!* Karakterleri girmeyin)",
                    "string.empty":"E-Mail Alanı Boş Olamaz",
                    "string.max":"E-Mail Alanı Max 25 karaketerli olmalı",
                    "string.email":"Lütfen Geçerli Bir E-mail Giriniz",
                    "string.min":"E-Mail alanı min 2 karakterli olmalı",
                    "string.required":"E-Mail alanı zorunludur"
                }),
                password:joi.string().trim().min(6).max(20).required().messages({
                    "string.base":"Şifreniz Alanı Normal Metin Olmalıdır(,.!* Karakterleri girmeyin)",
                    "string.empty":"Şifreniz Alanı Boş Olamaz",
                    "string.max":"Şifreniz Alanı Max 20 karaketerli olmalı",
                    "string.min":"Şifreniz alanı min 6 karakterli olmalı",
                    "string.required":"Şifreniz alanı zorunludur"
                })
            }).validateAsync(req.body)
            
        } catch (error) {
            if(error.details && error ?.details[0].message)
            throw new ERR(error.details[0].message, 400)
        else throw new ERR("Lütfen Validasyon kurallarına uyun")
        }
        next();
    }
}
module.exports = Validation;


