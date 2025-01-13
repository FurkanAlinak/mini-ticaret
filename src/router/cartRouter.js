const { addToCart, getCart, deleteCart, removeFromCart } = require("../controller/cartController");
const router = require("express").Router();
const { verifyToken } = require('../middleware/token');
const Validasyon=require("../middleware/cartProductValidation")


router.post("/addcart",verifyToken,addToCart);
router.get("/listcart",verifyToken,getCart);
router.delete("/remove",verifyToken,removeFromCart);
router.delete("/remove/all",verifyToken,deleteCart)

module.exports=router;