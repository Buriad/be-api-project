const mongoose = require("mongoose");
const users = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Enter your email!"],
        unique: true,
    },
    phone: {
        type: Number,
        minimum: 0,
    },
    password: {
        type: String,
        required: [true, "Enter your password!"],
    },
    role_id: {
        type: Number,
        user: 1,
        admin: 2,
    },
    created_date: Date,
    last_activity: Date,
});

module.exports = mongoose.model("Users", users);