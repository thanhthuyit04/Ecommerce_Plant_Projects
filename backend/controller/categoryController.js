const Category = require("../models/categoryModel");
const errorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const features = require("../utils/features.js");

//create product_Admin
exports.createCategory = catchAsyncErrors(async (req,res,next) =>{
    
  const {name, about} = req.body;
  const category = await Category.create({
    name,
    about,
  })

    res.status(201).json({
        success: true,
        category
    })
});


//get all category
exports.getAllCategorys = catchAsyncErrors(async (req, res) => {

  const categoryCount = await Category.countDocuments();

  const feature = new features(Category.find(), req.query)
    .search()
    .filter()
  const categorys = await feature.query;

  res.status(200).json({
    success: true,
    categorys,
    categoryCount,
  });
});

//update category_Admin
exports.updateCategory = catchAsyncErrors(async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("Category is not found with this id", 404));
  }
  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    category,
  });
});

//delete product_Admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    return next(new errorHandler("Category is not found with this id", 404));
  }

  await category.remove();
  res.status(200).json({
    success: true,
    message: "Category delete successfully",
  });
});
