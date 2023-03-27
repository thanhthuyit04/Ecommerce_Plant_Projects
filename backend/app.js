const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const errorHandler = require("./middleware/error");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(fileUpload({useTempFiles: true}));

// Route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const category = require("./routes/categoryRoute");
const order = require("./routes/orderRoute");
const blog = require("./routes/blogRoute");

app.use("/api/v2",product);

app.use("/api/v2",user);

app.use("/api/v2",category);

app.use("/api/v2",order);

app.use("/api/v2",blog);

app.use(errorHandler);

module.exports = app