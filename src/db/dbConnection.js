const mongoose = require('mongoose'); // mongoose çağrıldı
require("dotenv").config();// dotenv çağrıldı
mongoose.connect(process.env.DB_URL)// mongoose ile veritabanına bağlanıldı
    .then(() => {
        console.log("Database bağlantısı başarılı");// veritabanı bağlantısı başarılı
    })
    .catch((err) => {
        console.log("Database bağlantısı başarısız: ", err);// veritabanı bağlantı hatası
    });