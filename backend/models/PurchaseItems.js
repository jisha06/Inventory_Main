const Mongoose = require("mongoose");

const purchaseitemsSchema = Mongoose.Schema(
    {
        purchaseid: String,
        purchaseNo: String,
        itemName: String,
        quantity: String,
        price: String,
        totalPrice: String
    }
);

var purchaseitemsModel = Mongoose.model("purchaseitems", purchaseitemsSchema);
module.exports = purchaseitemsModel;