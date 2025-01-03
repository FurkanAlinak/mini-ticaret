const ERR = require("../util/error")

const errorHandler = (err, req, res, next) => {
    if (err instanceof ERR) {
        return res.status(err.statuscode).json({
            success: false,
            message: err.message
        })
    }
    return res.status(500).json({
        success: false,
        message: "API HATASI"
    })
}
module.exports=errorHandler;