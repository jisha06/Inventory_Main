const Mongoose = require("mongoose");

const VendorCreditSchema = Mongoose.Schema(
  {
    creditId: {
        type: String,
        required: true,
      },
      vendorName:{
        type: String,
        required: true,
      },
      purchaseOrderid: {
        type: String,
        required: true,
      },
      reason: {
        type: String,
        required: true,
      },
      creditNoteDate: {
        type: Date,
        required: true,
      },
  }
);
var vendorCreditModel = Mongoose.model("VendorCredits", VendorCreditSchema);
module.exports = vendorCreditModel;