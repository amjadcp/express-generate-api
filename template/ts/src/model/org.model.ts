import mongoose from "mongoose";

const orgModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
);

export default mongoose.model("org", orgModel);