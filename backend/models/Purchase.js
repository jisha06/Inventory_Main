const Mongoose = require("mongoose");

const PurchaseSchema = Mongoose.Schema(
    {
        purchaseOrderNo: String,
        vendorName: String,
        vendorId: String,
        vendorAddress: String,       
        vendorCity:String,
        vendorPostalcode: Number,
        vendorCountry: String,
        vendorEmail: String,
        deliveryTo  : String,
        referenceNo: String,
        orderDate: Date,      
        expectDeliveryDate:Date,
        shipmentPreference: String,
        items: String,
        status: String,
        billStatus: String,
        total: Number,
    }
);
var purchasesModel = Mongoose.model("Purchases", PurchaseSchema);
module.exports = purchasesModel;