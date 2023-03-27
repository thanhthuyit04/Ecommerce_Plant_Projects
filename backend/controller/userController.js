const User = require("../models/userModel.js")
const errorHandler = require("../utils/errorHandler.js")
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register user
exports.createUser = catchAsyncErrors(async (req,res,next) =>{
    try {
        const { name, email, password, avatar } = req.body;
    
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ success: false, message: "User already exists" });
        }
    
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
        });
    
        user = await User.create({
          name,
          email,
          password,
          avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
        });
        
        sendToken(user, 201, res);
    
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
});

//login user
exports.loginUser = catchAsyncErrors(async (req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password){
        return next(new errorHandler("Please enter your email & password",400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new errorHandler("User is not found with this email & password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new errorHandler("User is not found with this email & password",401));
    }
    sendToken(user,201,res);
});

//log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Log out success",
    });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req,res,next) =>{
    const user = await User.findOne({ email:req.body.email });

    if(!user){
        return next(new errorHandler("User is not found with this email", 404));
    }

    //get resetPassword token
    const resetToken = user.getResetToken();

    await user.save({
        validateBeforeSave: false
    });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

    const message = `Your password reset token is:- \n\n ${resetPasswordUrl}`;

    try{

        await sendMail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} succesfully`,
        });

    }catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTime = undefined;

        await user.save({
            validateBeforeSave:false
        });

        return next(new errorHandler(error.message, 500));
    }
}) ;

//reset password
exports.resetPassword = catchAsyncErrors(async (req,res,next) => {

    // Create Token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTime: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(new errorHandler("Reset password url is invalid or has been expired", 400));
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new errorHandler("Password is not matched with the new password", 400));
    }
  
    user.password = req.body.password;
  
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;
  
    await user.save();
  
    sendToken(user,200,res);
  });

//get user details
exports.userDetails = catchAsyncErrors(async(req,res,next) =>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });

});

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
   
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new errorHandler("Old Password is incorrect", 400));
    };

    if(req.body.newPassword  !== req.body.confirmPassword){
        return next(
            new errorHandler("Password not matched with each other", 400)
          );
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
});

// update user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    //we add cloudinary letter then we are giving condition for the avatar
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidator: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// get all users_Admin
exports.getAllUsers = catchAsyncErrors(async (req,res,next) =>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// get single user details_Admin
exports.getSingleUser = catchAsyncErrors(async (req,res,next) =>{
    const user = await User.findById(req.params.id);
   
    if(!user){
        return next(new errorHandler("User is not found with this id",400));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// change user role_Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    })
});

// delete user_Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next) =>{
  
    const user = await User.findById(req.params.id);
 
    const imageId = user.avatar.public_id;
 
    await cloudinary.v2.uploader.destroy(imageId);
 
     if(!user){
         return next(new errorHandler("User is not found with this id",400));
     }
 
     await user.remove();
 
     res.status(200).json({
         success: true,
         message:"User deleted successfully"
     })
 });