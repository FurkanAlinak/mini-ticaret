const router = require('express').Router();
const auth =require("./router");


router.use(auth);


module.exports = router;