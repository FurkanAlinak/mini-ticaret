const router = require('express').Router();
const { verifyToken } = require('../middleware/token');
const roleCheck =require("../middleware/roleCheck")
const {addProduct,deleteProduct, updateProduct}=require("../controller/controller")
const Validation = require("../middleware/validation");
const Validasyon = require("../middleware/productValidation");

router.post('/add-product', verifyToken, Validasyon.product, roleCheck(['admin']),addProduct);
router.delete("/list/delete/:id",verifyToken,roleCheck(['admin']),deleteProduct)
router.put("/list/:id",verifyToken,roleCheck(['admin']),updateProduct)

module.exports=router;