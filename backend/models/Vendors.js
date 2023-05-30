const Mongoose = require("mongoose");

const VendorsSchema = Mongoose.Schema(
    {
        vendnumber: String,
        fullName: String,
        creationDate: Date,
        address1: String,
        city:String,
        postalcode: Number,
        country: String,
        phoneNumber: Number,
        email:String        
    }
);
var vendorsModel = Mongoose.model("Vendors", VendorsSchema);
module.exports = vendorsModel;
