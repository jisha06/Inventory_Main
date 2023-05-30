const Mongoose = require("mongoose");

const ItemGroupSchema = Mongoose.Schema(
    {
        itemgroupNumber: { type: String, required: true },
        itemgroupName: { type: String, required: true },
        description: String
    }
);
var itemGroupModel = Mongoose.model("itemGroups", ItemGroupSchema);
module.exports = itemGroupModel;

// https://www.youtube.com/watch?v=A_-fn_ij59c&list=PLuHGmgpyHfRyM2UjMpOhwys4GFURK5Tz2
// https://www.youtube.com/watch?v=g_Yj-cvuAac