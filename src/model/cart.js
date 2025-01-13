const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
}, { collection: "cart", timestamps: true });

cartSchema.methods.removeItem = async function (productId) {
  const itemIndex = this.items.findIndex(item => item.productId.toString() === productId);

  if (itemIndex > -1) {
    this.items.splice(itemIndex, 1); // Ürünü sepetten çıkar
    this.totalPrice = this.items.reduce((total, item) => total + item.quantity * item.price, 0); // Toplam fiyatı güncelle
    return await this.save(); // Güncellenmiş sepeti kaydet
  } else {
    throw new Error("Ürün sepette bulunamadı.");
  }

};

module.exports = mongoose.model('Cart', cartSchema);
