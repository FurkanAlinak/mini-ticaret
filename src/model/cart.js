const mongoose = require('mongoose');
require('dotenv').config();

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
},{collection:"cart",timestamps:true});

cartSchema.methods.removeItem = function(productId) {
  const itemIndex = this.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex > -1) {
    this.items.splice(itemIndex, 1);
    this.totalPrice = this.items.reduce((total, item) => total + item.quantity * item.price, 0);
    return this.save();
  }
  return Promise.reject(new Error('Item not found in cart'));
};

const Cart = mongoose.model("Cart",cartSchema)
module.exports = Cart;
