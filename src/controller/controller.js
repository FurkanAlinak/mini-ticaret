const Product = require("../model/product");
const APIError = require("../util/error");
require('axios');
const Response = require("../util/response")
//Ürün ekleme
const addProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, brand , stock} = req.body;

        
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            brand,
            stock,
            createdBy: req.user._id, // Token'dan gelen admin bilgisi
        });
        await newProduct.save();
        return res.status(201).json({
            success: true,
            message: "Ürün başarıyla eklendi",
            product: newProduct,
        });
    } catch (error) {
        console.error("Ürün ekleme hatası:", error.message);
        next(new APIError("Ürün eklenirken bir hata oluştu.", 500));
    }
};

//Ürün silme
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        console.log("ürün:",product)
        if (!product) {
            console.log("hata buraya geliyor")
            throw new APIError("Ürün bulunamadı", 404);
        }

        res.status(200).json({
            status:true,
            message:"Şifre Değiştirme Başarılı",
            user:user
        })
    } catch (error) {
        res.status(500).json({ message: 'Ürün silinirken bir hata oluştu.', error });
    }
};
//Ürün güncelleme
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            { description, price, brand },
            { new: true }
        );
        if (!product) {
            throw new APIError("Ürün bulunamadı", 404);
        }
        res.status(200).json({ message: 'Ürün başarıyla değiştirildi.' });
    } catch (error) {
        console.error("Ürün Eklerken Hata", error);
        throw new APIError("Server Hatası", 500)
    }
}
//DBdeki bütün verileri listeler
const listProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
//Kategoriye göre listeler
const getListByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const product = await Product.find({ category });
        if (!product) {
            throw new APIError("Aradığınız Kategori Bulunamadı", 404);
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        return new Response("Hata").error500(res)
    }
}
//Idye göre getirir
const listById = async (req, res) => {
    try {
        const { id } = req.params; 

        // Ürünü ID ile bul
        const product = await Product.findById(id);
        if (!product) {
            throw new APIError("Böyle Bir Ürün Bulunamadı", 404);
        }

        // Bulunan ürünü döndür
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Sunucuda Hata oluştu" });
    }
};

module.exports = {
    addProduct, listProduct, getListByCategory, listById, deleteProduct, updateProduct

}