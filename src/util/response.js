class Response {
    constructor(data = null, message = null, status) {
        this.data = data,
            this.massage = message,
            this.status = status
    }
    succes(res) {
        return res.status(200).json({
            succes: true,
            data: this.data,
            message: this.massage ?? "İşlem Başarılı"
        })
    }
    created(res) {
        return res.status(201).json({
            succes: true,
            data: this.data,
            message: this.massage ?? "İşlem Başarıyla Oluşturuldu"
        })
    }
    error500(res) {
        return res.status(500).json({
            succes: false,
            data: this.data,
            message: this.massage ?? "Sunucu Hatası"
        })
    }
    error400(res) {
        return res.status(400).json({
            succes: false,
            data: this.data,
            message: this.massage ?? "Bad Request"
        })
    }
    error401(res) {
        return res.status(401).json({
            succes: false,
            data: this.data,
            message: this.massage ?? "Lütfen Oturum açın"
        })
    }
    error404(res) {
        return res.status(404).json({
            succes: false,
            data: this.data,
            message: this.massage ?? "İşlem Başarısız"
        })
    }
    error429(res) {
        return res.status(429).json({
            succes: false,
            data: this.data,
            message: this.massage ?? "Çok Fazla İstek(DDos)"
        })
    }
    error403(res) {
        return res.status(403).json({
            succes: false,
            data: this.data,
            message: this.message ?? "Admin Yetkiniz Yok"

        })
    }
}
module.exports = Response;