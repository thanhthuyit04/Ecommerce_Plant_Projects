const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter a name of a category"],
        trim: true,
        maxlength: [50, "Category name not exceed than 20 characters"]
    },
    about:{
        type: String,
        required:[true, "Please add a description of your category"],
    },

})

module.exports = mongoose.model("Category", categorySchema);