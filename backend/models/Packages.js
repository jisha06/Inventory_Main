const Mongoose = require("mongoose");

const packageSchema = Mongoose.Schema(
    {
        packageno: { type: String, required: true },
        salesOrderid: { type: String, required: true },
        date:  { type: Date, required: true },
        trackingNo:  { type: String, required: true },
        
        status: {type: String, required: true }
    }
);

var packagesModel = Mongoose.model("packages", packageSchema);
module.exports = packagesModel;