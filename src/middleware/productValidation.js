const joi = require("joi"); 
const APIError = require("../util/error"); 

class Validasyon {
    static product = async (req, res, next) => {
        try {
            
            const schema = joi.object({
                name: joi.string().min(2).max(50).required().trim().messages({
                    "string.base": "İsim alanı metin olmalıdır.",
                    "string.empty": "İsim alanı boş bırakılamaz.",
                    "string.min": "İsim alanı en az 2 karakter olmalıdır.",
                    "string.max": "İsim alanı en fazla 50 karakter olmalıdır.",
                    "any.required": "İsim alanı zorunludur.",
                }),
                description: joi.string().max(200).trim().messages({
                    "string.base": "Açıklama alanı metin olmalıdır.",
                    "string.max": "Açıklama alanı en fazla 200 karakter olmalıdır.",
                }),
                category: joi.string().min(2).max(20).required().trim().messages({
                    "string.base": "Kategori alanı metin olmalıdır.",
                    "string.empty": "Kategori alanı boş bırakılamaz.",
                    "string.min": "Kategori alanı en az 2 karakter olmalıdır.",
                    "string.max": "Kategori alanı en fazla 20 karakter olmalıdır.",
                    "any.required": "Kategori alanı zorunludur.",
                }),
                brand: joi.string().min(2).max(20).required().trim().messages({
                    "string.base": "Marka alanı metin olmalıdır.",
                    "string.empty": "Marka alanı boş bırakılamaz.",
                    "string.min": "Marka alanı en az 2 karakter olmalıdır.",
                    "string.max": "Marka alanı en fazla 20 karakter olmalıdır.",
                    "any.required": "Marka alanı zorunludur.",
                }),
                price: joi.number().positive().required().messages({
                    "number.base": "Fiyat bir sayı olmalıdır.",
                    "number.positive": "Fiyat pozitif bir sayı olmalıdır.",
                    "any.required": "Fiyat alanı zorunludur.",
                }),
            });

            
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400));
            }
            return next(new APIError("Lütfen validasyon kurallarına uyun.", 400));
        }
    };
}

module.exports = Validasyon;
