const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getAllOrders,
  getAdminAllOrders,
  updateAdminOrder,
  deleteOrder,
  getShipperAllOrders,
  updateShipperOrder,
  getAdminAllOrdersDelivered,
  getUserAllOrdersDelivered,
} = require("../controller/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, getAllOrders);

router.route("/orders/me/delivered").get(isAuthenticatedUser, getUserAllOrdersDelivered);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminAllOrders);

  router
  .route("/admin/orders/delivered")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminAllOrdersDelivered);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateAdminOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router.route("/shipper/orders").get(isAuthenticatedUser, authorizeRoles("shipper"),getShipperAllOrders);

router
  .route("/shipper/order/new")
  .post(isAuthenticatedUser, authorizeRoles("shipper"), updateShipperOrder)
// // router.route("/products/:categoryId").get(getProductsByCategoryId);

// router
//   .route("/product/new")
//   .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// router
//   .route("/product/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// router
//   .route("/product/:id")
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// router.route("/product/:id").get(getSingleProduct);

// router.route("/product/review").post(isAuthenticatedUser, createProductReview);

// router
//   .route("/reviews")
//   .get(getSingleProductReviews)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;
