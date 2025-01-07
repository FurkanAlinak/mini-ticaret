const cart = require("../model/cart");
const product = require("../model/product");


const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; 

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Ürün bulunamadı.' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      // Miktarı artır
      existingItem.quantity += quantity;
    } else {
      // Yeni ürün ekle
      cart.items.push({ product: productId, quantity });
    }

    // Toplam fiyatı güncelle
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * product.price,
      0
    );

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};
