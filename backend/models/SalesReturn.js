const Mongoose = require("mongoose");

const SalesReturnSchema = Mongoose.Schema(
  {
    salesOrderid: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
    }
  }
);
var salesReturnModel = Mongoose.model("SalesReturn", SalesReturnSchema);
module.exports = salesReturnModel;
