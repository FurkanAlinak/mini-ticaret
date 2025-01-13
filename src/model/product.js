const { required, defaults } = require('joi');
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
        required: false,
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
    brand: {
        type: String,
        required: true,
        trim: true
    },//marka
    stock: {
        type: Number,
        required: true,
        trim: true,
        defaults: 1
    }
}, { collection: "products", timestamps: true });//tablo adı ve tarih alanı

const Product = mongoose.model('Product', productSchema);

module.exports = Product;