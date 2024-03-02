import mongoose from "mongoose";

const roomModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "org",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    capacity: {
        type: Number,
        default: 0,
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
}, {timestamps: true});

roomModel.index({ org: 1, name: 1 }, { unique: true });

export default mongoose.model("room", roomModel);