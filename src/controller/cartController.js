const Product = require("../model/product");
const Cart = require("../model/cart");
const APIError = require("../util/error");


const addToCart = async (req, res, next) => {
  const {productId,quantity} =  req.body;
  const userId = req.user.id;
  try {
    const product = await Product.findById(productId);
    if(!product){
      next(new APIError("Ürün Bulunamadı",404));
    }
    
  } catch (error) {
    
  }

}
  