require("express-async-errors");
const express = require('express');
const app = express();
require('dotenv').config();

//bağlantılar
require("./src/db/dbConnection")
const router=require("./src/router/index");
const errorHandler=require("./src/middleware/errorHandler");


//port .env dosyasından alınıyor
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api",router)


app.get('/', (req, res) => {
    res.json({ message: 'Mini E-Ticaret Sitesi' });
});//ana sayfa

app.use(errorHandler); //hata yönetimi

app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı.`);
})//sunucu başlatma
