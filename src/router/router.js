const router = require('express').Router();
const {register,login, me, getProfile, updatePassword} = require("../controller/userController");
const { verifyToken } = require('../middleware/token');
const roleCheck =require("../middleware/roleCheck")
const {addProduct, listProduct,getListByCategory,listById, deleteProduct, updateProduct}=require("../controller/controller")
const Validation = require("../middleware/validation");
const Validasyon = require("../middleware/productValidation");
//User Router.
router.post("/register",Validation.register,register);
router.post("/login",Validation.login,login);
router.get("/profile",getProfile)
router.get("/user",verifyToken,me)
router.put("/update-password",verifyToken,updatePassword)
router.get('/admin', verifyToken, roleCheck(['admin']), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bu rota sadece admin kullanıcılar için.",
    })});
//Product Router.
router.get("/list",listProduct)
router.get("/list/:id",listById)
router.get("/list/category/:category",getListByCategory);
//Product Router (Admin)
router.post('/products', verifyToken, roleCheck(['admin']),Validasyon.product, addProduct);
router.delete("/list/delete/:id",verifyToken,roleCheck(['admin']),deleteProduct)
router.put("/list/:id",verifyToken,roleCheck(['admin']),updateProduct)
module.exports = router;