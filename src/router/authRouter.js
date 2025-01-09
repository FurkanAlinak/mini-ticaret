const router = require('express').Router();
const {register,login, me, getProfile, updatePassword, userControl} = require("../controller/userController");
const Validation = require("../middleware/validation");
const { verifyToken } = require('../middleware/token');
const roleCheck =require("../middleware/roleCheck")

router.post("/register",Validation.register,register);
router.post("/login",Validation.login,login);
router.get("/profile",verifyToken,getProfile)
router.get("/user",verifyToken,me)
router.put("/user/update-password",verifyToken,Validation.upgradePassword,updatePassword)
router.get('/admin', verifyToken, roleCheck(['admin']),userControl);

module.exports=router;