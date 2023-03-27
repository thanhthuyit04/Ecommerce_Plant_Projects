const express = require("express");
const {
  createBlog,
  getAdminBlogs,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  createCommentBlog,
  getSingleBlogComments,
  deleteComment,
} = require("../controller/blogController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/blogs").get(getAllBlogs);

// // router.route("/products/:categoryId").get(getProductsByCategoryId);

router
  .route("/admin/blogs")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminBlogs);

router
  .route("/blog/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBlog);

router
  .route("/blog/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBlog);

router
  .route("/blog/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog);

router.route("/blog/:id").get(getSingleBlog);

router.route("/blog/comment").post(isAuthenticatedUser, createCommentBlog);

router
  .route("/comments")
  .get(getSingleBlogComments)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteComment);

module.exports = router;
