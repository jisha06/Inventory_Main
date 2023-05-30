const Mongoose = require("mongoose");

const CustomersSchema = Mongoose.Schema(
    {
        custnumber: String,
        fullName: String,
        type: String,
        creationDate: Date,
        address1: String,      
        city:String,
        postalcode: Number,
        country: String,
        phoneNumber: Number,
        email:String        
    }
);
var customersModel = Mongoose.model("Customers", CustomersSchema);
module.exports = customersModel;
