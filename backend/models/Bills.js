const Mongoose = require("mongoose");

const BillsSchema = Mongoose.Schema(
    {
        vendorName: String,
        sourceofSupply: String,
        destinationofSupply: String,
        billNo  : String,
        purchaseOrderNo: String,
        purchaseOrderid: String,
        billDate: Date,      
        dueDate:Date,
        paymentTerm: String,      
    }
);
var billsModel = Mongoose.model("Bills", BillsSchema);
module.exports = billsModel;