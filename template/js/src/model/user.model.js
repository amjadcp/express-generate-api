import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "org",
    },
    password: {
        type: String,
        required:true,
    },
    fcmTokens: [String],
    isAdmin: {
        type: Boolean,
        default: false,
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

export default mongoose.model("user", userModel);