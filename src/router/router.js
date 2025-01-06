const router = require('express').Router();
const {register,login, me, getProfile} = require("../controller/userController");
const { verifyToken } = require('../middleware/token');
const roleCheck =require("../middleware/roleCheck")
const {addProduct, listProduct,getListByCategory,listById, deleteProduct, updateProduct}=require("../controller/controller")


//RESTful API Router.

//User Router.
router.post("/register",register);
router.post("/login",login);
router.get("/profile",getProfile)
router.get("/user",verifyToken,me)
router.get('/admin', verifyToken, roleCheck(['admin']), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bu rota sadece admin kullanıcılar için.",
    });


});

//Product Router.

router.get("/list",listProduct)//ürünler listesi
router.get("/list/:id",listById)//listedeki ürünleri id ye göre getirir
router.get("/list/category/:category",getListByCategory);//listedki ürünleri kategoriye göre getirir.

//Product Router (Admin)
router.post('/products', verifyToken, roleCheck(['admin']), addProduct); //ürün ekleme
router.delete("/list/delete/:id",verifyToken,roleCheck(['admin']),deleteProduct)//ürün silme
router.put("/list/:id",verifyToken,roleCheck(['admin']),updateProduct)//ürün güncelleme


module.exports = router;