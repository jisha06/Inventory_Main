const Mongoose = require("mongoose");

const CreditNoteSchema = Mongoose.Schema(
  {
    creditId: {
        type: String,
        required: true,
      },
      customerName:{
        type: String,
        required: true,
      },
      salesOrderid: {
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
var creditNotesModel = Mongoose.model("CreditNote", CreditNoteSchema);
module.exports = creditNotesModel;