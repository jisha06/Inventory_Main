const Mongoose = require("mongoose");

const deliveryChallanSchema = new Mongoose.Schema({
  deliveryChallanNo:{
    type: String,
    required: true
  },
  salesOrderNumber: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: Date,
    default: Date.now
  },
  // Add other fields as per your requirements
});

const deliveryChallanModel = Mongoose.model('deliveryChallan', deliveryChallanSchema);

module.exports = deliveryChallanModel;