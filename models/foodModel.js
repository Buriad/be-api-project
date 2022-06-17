const mongoose = require("mongoose");
const foodModel = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    sales: {
        type: Number,
        required: [true, "Enter the sales!"],
    },
    name: {
        type: String,
        required: [true, "Enter the name!"],
    },
    price: {
        type: Number,
        required: [true, "Enter the type!"],
    },
    portion: {
        type: Number,
        required: [true, "Enter the portion"],
    },
    stock: {
        type: Number,
        required: [true, "Enter the stock!"],
    },
    image: {
        type: String,
        required: [true, "Enter the image!"],
    },
    tumb_img: {
        type: String,
        required: [true, "Enter the tumbimg!"],
    },
    ingredients: {
        type: String,
        required: [true, "Enter the ingredients!"],
    },
    discount: {
        type: Number,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category",
    },
});

module.exports = mongoose.model("foodmodels", foodModel);