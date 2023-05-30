const Mongoose = require("mongoose");

const itemSchema = Mongoose.Schema(
    {
        name: { type: String, required: true },
        unit: { type: String, required: true },
        dimensions: { type: String },
        weight: { type: Number },
        manufacturer: { type: String },
        brand: { type: String },
        sellingPrice: { type: Number, required: true },
        costPrice: { type: Number, required: true },
        description: { type: String },
        openingStock: { type: Number, required: true },
        reorderPoint: { type: Number, required: true },
        preferredVendor: { type: String },
        image:{ type: String}
    }
);

var itemsModel = Mongoose.model("items", itemSchema);
module.exports = itemsModel;