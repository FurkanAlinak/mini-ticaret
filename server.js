require("express-async-errors");
const express = require('express');
const app = express();
require('dotenv').config();

//bağlantılar
require("./src/db/dbConnection")
const authRouter = require("./src/router/authRouter");
const productRouter = require("./src/router/productRouter");
const adminRouter = require("./src/router/adminRouter");
const errorHandler = require("./src/middleware/errorHandler");

//port .env dosyasından alınıyor
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/admin",adminRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Mini E-Ticaret Sitesi' });
});//ana sayfa

app.use(errorHandler); //hata yönetimi

app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
})//sunucu başlatma
