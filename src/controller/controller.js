const Product = require("../model/product");
const APIError = require("../util/error");
require('axios');
const Response = require("../util/response")
//ürün ekleme
const addProduct = async (req, res,next) => {
    try {
        const { name, price, description, category, brand } = req.body;

        // Yeni ürün oluştur
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            brand,
            createdBy: req.user._id, // Token'dan gelen admin bilgisi
        });
        if(!price){
            next(new APIError("Lütfen Fiyat Bilgisi Giriniz!!!",400));
        }
        await newProduct.save();
        return res.status(201).json({
            success: true,
            message: "Ürün başarıyla eklendi",
            product: newProduct,
        });

    } catch (error) {
        console.error("Ürün ekleme hatası:", error.message);
        return res.status(500).json({
            success: false,
            message: "Ürün eklenirken bir hata oluştu",
        });
    }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı.' });
    }

    res.status(200).json({ message: 'Ürün başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Ürün silinirken bir hata oluştu.', error });
  }
};

const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            { description, price, brand },
            { new: true } 
          );
          if(!product){
            return res.status(404).json({message:"Ürün Bulunamadı"})
          }
          res.status(200).json({ message: 'Ürün başarıyla değiştirildi.' });
    } catch (error) {
        return res.status(404).json({message:"Ürün Bulunamadı"})
    }
}

//dbdeki bütün verileri listeler
const listProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
//kategoriye göre listeler
const getListByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const product = await Product.find({ category });
        if (!product) {
            return res.status(404).json({ message: "Aradığınız Kategori Bulunamadı" })
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        return new Response("Hata").error500()
    }
}
//idye göre getirir
const listById = async (req, res) => {
    try {
        const { id } = req.params;

        // Ürünü ID ile bul
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Böyle bir ürün bulunamadı." });
        }

        // Bulunan ürünü döndür
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Sunucuda bir hata oluştu." });
    }
};


module.exports = {
    addProduct, listProduct, getListByCategory, listById,deleteProduct,updateProduct

}