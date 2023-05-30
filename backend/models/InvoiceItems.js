const Mongoose = require("mongoose");

const invoiceitemsSchema = Mongoose.Schema(
    {
        invoiceid: String,
        invoiceNumber: String,
        itemName: String,
        quantity: String,
        price: String,
        totalPrice: String
    }
);

var invoiceitemsModel = Mongoose.model("invoiceitems", invoiceitemsSchema);
module.exports = invoiceitemsModel;