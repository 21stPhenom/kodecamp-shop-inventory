const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true});

const shopItems = mongoose.model('shopitems', shopItemSchema);

module.exports = shopItems;