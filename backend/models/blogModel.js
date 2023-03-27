const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please enter name of a product"],
        trim: true,
        maxlength: [50, "Product name not exceed than 50 characters"]
    },
    short:{
        type: String,
        required: [true, "Please add short for blog"],
        maxlength:[5000, "Description is can not exceed than 5000 characters"]
    },
    content:{
        type: String,
        required:[true, "Please add description of your product"],
        maxlength: [5000, "Description is can not exceed than 5000 characters"]
    },
    images:[
        {
            public_id:{
                type: String,
                required: true,
            },
            url:{
                type: String,
                required: true,
            },
        }
    ],

    numOfCommentBlog:{
        type: Number,
        default: 0,
    },

    commentBlog:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type: String,
                required: true,
            },
            comment:{
                type: String,
            },
            time:{
                type: Date,
                default: Date.now()
            },
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        // required: true,
    },
    createAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Blog", blogSchema);