const errorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Interval server error"

    //wrong mongodb error
    if(err.name === "CastError"){
        const message = `Resources not found with this id invalid ${err.path}`;
        err = new errorHandler(message, 400);
    }

    // duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new errorHandler(message, 400);
    }

    // wrong Jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid please try again`;
        err = new errorHandler(message, 400);
    }

    //jwt expired error
    if (err.name === "TokenExpiredError") {
        const message = `Your url is expired please try again`;
        err = new errorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}
