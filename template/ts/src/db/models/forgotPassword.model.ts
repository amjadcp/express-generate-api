import mongoose from "mongoose";

const forgotPasswordModel = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
},
{ timestamps: true }
);

export default mongoose.model("forgot-password", forgotPasswordModel);