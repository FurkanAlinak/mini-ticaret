const router = require('express').Router();
const { listProduct,getListByCategory,listById}=require("../controller/controller")

router.get("/list",listProduct)
router.get("/list/:id",listById)
router.get("/list/category/:category",getListByCategory);




module.exports=router;