const express = require("express");
const {
  createCategory,
  getAllCategorys,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/categories").get(getAllCategorys);

// // router.route("/products/:categoryId").get(getProductsByCategoryId);

router
  .route("/category/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);

router
  .route("/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory);

router
  .route("/category/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

// router.route("/product/:id").get(getSingleProduct);

// router.route("/product/review").post(isAuthenticatedUser, createProductReview);

// router
//   .route("/reviews")
//   .get(getSingleProductReviews)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;
