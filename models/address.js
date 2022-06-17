const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AddressSchema = new schema({
    district: {
        type: String,
    },
    khoroo: {
        type: String,
    },
    apartment: {
        type: String,
    },
    additional: {
        type: String,
    },
    address_type: {
        type: String,
        enum: ["main", "sub"],
    },
    user_id: {
        type: schema.Types.ObjectId,
        ref: "user",
    },
});

module.exports = mongoose.model("address", AddressSchema);