const joi = require("joi");
const APIError = require("../util/error");

class Validasyon {
    static product = async (req, res, next) => {
        try {
            await joi
                .object({
                    name: joi.string().min(2).max(50).required().trim().message({
                        "string.base": "İsim alanı metin olmalıdır.",
                        "string.empty": "İsim alanı boş bırakılamaz.",
                        "string.min": "İsim alanı en az 2 karakter olmalıdır.",
                        "string.max": "İsim alanı en fazla 50 karakter olmalıdır.",
                        "any.required": "İsim alanı zorunludur.",
                    }),
                    description: joi.string().max(200).trim().message({
                        "string.base": "İsim alanı metin olmalıdır.",
                        "string.max": "İsim alanı en fazla 200 karakter olmalıdır.",
                    }),
                    category: joi.string().min(2).max(20).required().trim().message({
                        "string.base": "kategori alanı metin olmalıdır.",
                        "string.empty": "kategori alanı boş bırakılamaz.",
                        "string.min": "kategori alanı en az 2 karakter olmalıdır.",
                        "string.max": "kategori alanı en fazla 20 karakter olmalıdır.",
                        "any.required": "kategori alanı zorunludur.",
                    }),
                    brand: joi.string().min(2).max(20).required().trim().message({
                        "string.base": "marka alanı metin olmalıdır.",
                        "string.empty": "marka alanı boş bırakılamaz.",
                        "string.min": "marka alanı en az 2 karakter olmalıdır.",
                        "string.max": "marka alanı en fazla 20 karakter olmalıdır.",
                        "any.required": "marka alanı zorunludur.",
                    })
                }).validateAsync(req.body);
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400)); // Özelleştirilmiş hata mesajı
            }
            return next(new APIError('Lütfen validasyon kurallarına uyun.', 400));
        }
        next();
    }
}
module.exports=Validasyon;