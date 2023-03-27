const Order = require("../models/orderModel");
const errorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Product = require("../models/productModel");
//create order
exports.createOrder = catchAsyncErrors(async(req,res,next) =>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order
    })
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) =>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new errorHandler("Order items not found with this id",404));
    };

    res.status(200).json({
        success: true,
        order
    });
});

//get all orders
exports.getAllOrders = catchAsyncErrors(async(req,res,next) =>{
    const orders = await Order.find({user: req.user._id});
    res.status(200).json({
        success: true,
        orders
    })
})

//get user orders delivered_User
exports.getUserAllOrdersDelivered = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user: req.user._id, orderStatus: 'Delivered'});
    
    if(!orders){
        return next(new errorHandler("Order not found with this Id", 404));
    }

    res.status(201).json({
        success: true,
        orders
    });

});

//get admin all orders_Admin
exports.getAdminAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

//get admin all order delivered_Admin
exports.getAdminAllOrdersDelivered = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({orderStatus: 'Delivered'});
    
    if(!orders){
        return next(new errorHandler("Order not found with this Id", 404));
    }

    res.status(201).json({
        success: true,
        orders
    });

});

//update order status_Admin
exports.updateAdminOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new errorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new errorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Processing") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
      
    const product = await Product.findById(id);
  
    product.stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }

//delete order_Admin
exports.deleteOrder = catchAsyncErrors(async (req,res,next) =>{

    const order = await Order.findById(req.params.id);
    
    if(!order){
      return next(new errorHandler("Order not found with this Id", 404));
    }
    
    if(order.orderStatus === "Shipping"){
        return next(new errorHandler("Order can not remove", 404));
    }

    if(order.orderStatus === "Shipped"){
        return next(new errorHandler("Order can not remove", 404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new errorHandler("Order can not remove", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});

//get order_shipper
exports.getShipperAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({orderStatus: 'Processing'});
    
    if(!orders){
        return next(new errorHandler("Order not found with this Id", 404));
    }

    res.status(201).json({
        success: true,
        orders
    });

});

//update shipper order_Shipper
exports.updateShipperOrder = catchAsyncErrors(async (req, res, next) => {
    const { orderId } = req.body;
  
    const shipperInfo = {
      shipper: req.user._id,
      name: req.user.name,
    };

    const order = await Order.findById(orderId);

    if(order.orderStatus ==="Shipped"){
        return next(new errorHandler("Order shipped",404));
    }

    if (req.body.status === "Shipping") {
        order.shipperInfo.push(shipperInfo);
        if(order.orderStatus ==="Shipping"){
            return next(new errorHandler("Order shipping",404));
        }
    }

    order.orderStatus = req.body.status;

    

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  });
