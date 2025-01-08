const Product = require("../model/product");
const Cart = require("../model/cart");
const APIError = require("../util/error");

const getCart = async (req, res, next) => {
  try {
      const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId', 'name price');
      if (!cart) {
          throw new APIError("Sepet Bulunamadı",404)
      }
      res.status(200).json(cart);
  } catch (error) {
     throw new APIError("Sepet görüntülenirken hata oluştu", 500);
  }
};

const addToCart = async (req, res, next) => {
  try {
      const { productId, quantity } = req.body;

      let cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
          cart = new Cart({ userId: req.user.id, items: [] });
      }

      const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (productIndex > -1) {
          cart.items[productIndex].quantity += quantity;
      } else {
          const product = await Product.findById(productId);
          if (!product) {
              return next(new APIError("Ürün bulunamadı", 404));
          }
          cart.items.push({ productId, quantity, price: product.price });
      }

      cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
      await cart.save();

      res.status(200).json({ success: true, message: "Ürün sepete eklendi", cart });
  } catch (error) {
      next(new APIError("Ürün sepete eklenirken hata oluştu", 500));
  }
};

  