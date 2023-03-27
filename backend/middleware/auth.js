const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) =>{
    const {token} = req.cookies;

    if(!token){
        return next(new errorHandler("Please login for access this resources",401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodeData.id);

    next();

})

// admin roles
exports.authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(new errorHandler(`${req.user.role} can not access this resources`));
        }
        next()
    }
}