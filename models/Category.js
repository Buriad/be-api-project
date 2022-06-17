const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Enter the name!'],
    },
    color: {
        type: String
    }
}
);

module.exports = mongoose.model("category", categorySchema);