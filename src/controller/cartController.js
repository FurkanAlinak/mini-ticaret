const Product = require("../model/product");
const Cart = require("../model/cart");
const APIError = require("../util/error");
const Response = require("../util/response");



const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId', 'name price description');
    if (!cart) {
      return new Response(cart, "Sepetiniz boş").error400(res)
    }
    new Response(cart, "Sepet görüntülendi", 200).succes(res);
  } catch (error) {
    new Response(null, "Sepet görüntülenirken hata oluştu", 500).error500(res);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    console.log(productId, quantity);
    if (!productId || !quantity || quantity <= 0) {
      throw new APIError("Geçersiz ürün ID veya miktar", 400);
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }
    console.log(cart);
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    const product = await Product.findById(productId);
    if (!product) {
      throw new APIError("Ürün bulunamadı", 404);
    }

    if (product.stock < quantity) {
      throw new APIError("Yeterli stok yok", 400);
    }

    if (productIndex > -1) {
      // Ürün zaten varsa miktarı güncelle
      cart.items[productIndex].quantity += quantity;
    } else {
      // Ürün sepette yoksa, sepete ekle
      cart.items.push({ productId, quantity, price: product.price });
    }

    // Toplam fiyatı güncelle
    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    // Stok miktarını güncelle
    product.stock -= quantity;
    await product.save();

    await cart.save();
    console.log("cartıd", cart);
    new Response(product, "Ürün sepete eklendi", 200).succes(res);
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

    if (!productId) {
      throw new APIError("Ürün ID'si zorunludur", 400);
    }
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
    // Sepetten ürünü çıkar
    await cart.removeItem(productId);
    

    // Başarılı yanıt döndür
    new Response(cart, "Ürün sepetten çıkarıldı", 200).succes(res);
  } catch (error) {
    next(error); // Hata middleware'ine gönder
  }
};


const deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      throw new APIError("Sepet Bulunamadı", 404);
    }

    // Stok miktarını güncelle
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await Cart.findOneAndDelete({ userId: req.user.id });
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

