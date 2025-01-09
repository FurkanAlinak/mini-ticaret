const Product = require("../model/product");
const Cart = require("../model/cart");
const APIError = require("../util/error");
const Response = require("../util/response");

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId', 'name price');
    if (!cart) {
      throw new APIError("Sepet Bulunamadı", 404);
    }
    new Response(cart, "Sepet görüntülendi", 200).succes(res);
  } catch (error) {
    new Response(null, "Sepet görüntülenirken hata oluştu", 500).error500(res);
  }
};

const addToCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
        console.log(productId,quantity);
      if (!productId || !quantity || quantity <= 0) {
        throw new APIError("Geçersiz ürün ID veya miktar", 400);
      }

      let cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
        cart = new Cart({ userId: req.user.id, items: [] });
      }
      console.log(cart);
      const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
      if (productIndex > -1) {
        // Ürün zaten varsa miktarı güncelle
        cart.items[productIndex].quantity += quantity;
      } else {
        // Ürün sepette yoksa, ürün veritabanında var mı kontrol et
        const product = await Product.findById(productId);
        if (!product) {
          throw new APIError("Ürün bulunamadı", 404);
        }
        cart.items.push({ productId, quantity, price: product.price });
      }
  
      // Toplam fiyatı güncelle
      cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
      await Cart.save();
  
      new Response(cart, "Ürün sepete eklendi", 200).succes(res);
    } catch (error) {
      next(error); // Hataları error middleware'e ilet
    }
  };

const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      throw new APIError("Sepet Bulunamadı", 404);
    }
    await cart.removeItem(productId);
    new Response(cart, "Ürün sepetten çıkarıldı", 200).succes(res);
  } catch (error) {
    new Response(null, "Ürün sepetten çıkarılırken hata oluştu", 500).error500(res);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.user.id });
    if (!cart) {
      throw new APIError("Sepet Bulunamadı", 404);
    }
    new Response(null, "Sepet silindi", 200).succes(res);
  } catch (error) {
    new Response(null, "Sepet silinirken hata oluştu", 500).error500(res);
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  deleteCart
};

