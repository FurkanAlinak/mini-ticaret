require("express-async-errors");
const express = require('express');
const app = express();
require('dotenv').config();
const errorHandler = require("./src/middleware/errorHandler");

//bağlantılar
require("./src/db/dbConnection")
const authRouter = require("./src/router/authRouter");
const productRouter = require("./src/router/productRouter");
const adminRouter = require("./src/router/adminRouter");
const cartRouter= require("./src/router/cartRouter");

//port .env dosyasından alınıyor
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cart",cartRouter); //sepet routerı
app.use("/auth", authRouter); //kullanıcı routerı
app.use("/product", productRouter); //ürün routerı
app.use("/admin",adminRouter);//admin routerı

app.get('/', (req, res) => {
    res.json({ message: 'Mini E-Ticaret Sitesi' });
});//ana sayfa

app.use(errorHandler); //hata yönetimi

app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
})//sunucu başlatma
