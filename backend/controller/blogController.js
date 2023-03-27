const Blog = require("../models/blogModel.js");
const errorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const features = require("../utils/features.js");

//create blog_Admin
exports.createBlog = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    short,
    content,
    images,
  } = req.body;

  const blog = await Blog.create({
    title,
    short,
    content,
    images,
  });
  

  res.status(201).json({
    success: true,
    blog,
  });
});

// Get All Blog_Admin
exports.getAdminBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    blogs,
  });
});

//get all blog
exports.getAllBlogs = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 4;

  const blogsCount = await Blog.countDocuments();

  const feature = new features(Blog.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const blogs = await feature.query;

  res.status(200).json({
    success: true,
    blogs,
    blogsCount,
    resultPerPage,
  });
});

//update blog_Admin
exports.updateBlog = catchAsyncErrors(async (req, res) => {
  let blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog is not found with this id", 404));
  }
  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    blog,
  });
});

//delete blog_Admin
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new errorHandler("Blog is not found with this id", 404));
  }

  await blog.remove();
  res.status(200).json({
    success: true,
    message: "Blog delete successfully",
  });
});

//single blog details
exports.getSingleBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new errorHandler("Blog is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    blog,
  });
});

// create new comment or update the comment blog
exports.createCommentBlog = catchAsyncErrors(async (req, res, next) => {
    const { comment, blogId } = req.body;
  
    const commentB = {
      user: req.user._id,
      name: req.user.name,
      comment,
    };
  
    const blog = await Blog.findById(blogId);
  
    const isCommented = blog.commentBlog.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isCommented) {
      blog.commentBlog.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.comment = comment);
      });
    } else {
      blog.commentBlog.push(commentB);
      blog.numOfCommentBlog = blog.commentBlog.length;
    }
  
    await blog.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

//get all reviews of a single blog
exports.getSingleBlogComments = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.query.id);

  if (!blog) {
    return next(new errorHandler("Blog is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    commentBlog: blog.commentBlog,
  });
});

// delete comment_Admin
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.query.blogId);

  if (!blog) {
    return next(new errorHandler("Blog not found with this id", 404));
  }

  const commentBlog = blog.commentBlog.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  const numOfCommentBlog = commentBlog.length;

  await Blog.findByIdAndUpdate(
    req.query.blogId,
    {
      commentBlog,
      numOfCommentBlog,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
