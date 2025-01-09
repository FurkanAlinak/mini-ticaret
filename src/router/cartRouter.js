const { addToCart, getCart, deleteCart, removeFromCart } = require("../controller/cartController");
const router = require("express").Router();
const { verifyToken } = require('../middleware/token');


router.post("/addcart",verifyToken,addToCart);
router.get("/listcart",verifyToken,getCart);
router.delete("/remove/:productId",verifyToken,deleteCart);
router.delete("/remove/all",verifyToken,removeFromCart)

module.exports=router;