const Mongoose = require("mongoose");

const InventoryAdjustmentSchema = Mongoose.Schema(
    {
        mode: String,
        refernceNumber: String,
        date: Date,
        reason: String,
        description: String,
        item: String,
        details: String
    }
);
var inventoryAdjustmentModel = Mongoose.model("inventoryAdjustments", InventoryAdjustmentSchema);
module.exports = inventoryAdjustmentModel;
