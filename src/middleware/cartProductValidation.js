const joi = require("joi");
const APIError = require("../util/error");

class Validasyon {
    static cartProduct = async (req,res,next)=>{
        try {
            const schema = joi.object({
                productId : joi.string().required().trim().messages({
                    "string.base": "Ürün numarası alanı metin olmalıdır.",
                    "string.empty": "Ürün ismi alanı boş bırakılamaz.",
                    "any.required": "Ürün ismi alanı zorunludur.",
                }),
                quantity : joi.number().positive().required().message({
                    "number.base": "Miktar bir sayı olmalıdır.",
                    "number.positive": "Miktar pozitif bir sayı olmalıdır.",
                    "any.required": "Miktar alanı zorunludur.",
                })
            });
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400));
            }
            return next(new APIError("Lütfen validasyon kurallarına uyun.", 400));
        }
    }
    static removeCart = async (req,res,next)=>{
        try {
            await joi
            .object({
                productId : joi.string().required().trim().messages({
                    "string.base": "Ürün numarası alanı metin olmalıdır.",
                    "string.empty": "Ürün ismi alanı boş bırakılamaz.",
                    "any.required": "Ürün ismi alanı zorunludur.",
                }),
            })
        } catch (error) {
            
        }
    }
}

module.exports=Validasyon;
