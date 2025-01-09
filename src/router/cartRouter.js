const { addToCart, getCart, deleteCart, removeFromCart } = require("../controller/cartController");

const router = require("express").Router();

router.post("/addcart",addToCart);
router.get("/listcart",getCart);
router.delete("/remove/:productId",deleteCart);
router.delete("/remove/all",removeFromCart)


module.exports=router;