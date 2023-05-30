const Mongoose = require("mongoose");

const invoiceSchema = Mongoose.Schema(
    {
        invoiceid: String,
        invoiceDate: Date,
        salesOrderid: String,       
        senderName: String,
        senderAddress: String,
        senderCity: String,
        senderPostalCode : String,
        senderCountry : String,
        clientAddress: String,
        clientName: String,
        clientCity:String,
        clientPostalcode: Number,
        clientCountry: String,
        clientEmail: String,
        description: String,
        createdAt: Date,
        paymentDue: Date,
        items: String,
        total: Number,
        status: String, 
        packedStatus: String,
        packageno: String,
        trackingNo: String,
        
    }
);

var invoiceModel = Mongoose.model("invoice", invoiceSchema);
module.exports = invoiceModel;