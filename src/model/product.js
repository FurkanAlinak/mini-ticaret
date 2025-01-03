const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },//ürün adı
    description: {
        type: String,
        required: true,
        trim: true
    },//açıklama
    price: {
        type: Number,
        required: true,
        trim: true
    },//fiyat
    category: {
        type: String,
        required: true,
        trim: true
    },//kategori
    image: {
        type: String,
        required: true,
        trim: true
    },//resim
    brand: {
        type: String,
        required: true,
        trim: true
    },//marka
},{collection:"products",timestamps:true});//tablo adı ve tarih alanı

const Product = mongoose.model('Product', productSchema);

module.exports = Product;