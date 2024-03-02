import mongoose from "mongoose";

const meetingModel = new mongoose.Schema({
    title: {
        type: String,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
        required: true,
    },
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "org",
        required: true,
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    attendees: [{
        type: String,
        required: true,
    }],
    eventId: {
        type: String,
        default: null,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    isSentStartNotification: { // notification sent 10 minutes before the meeting starts
        type: Boolean,
        default: false,
    },
    isSentEndNotification: { // notification sent 5 minutes before the meeting ends
        type: Boolean,
        default: false,
    },
}, {timestamps: true});


export default mongoose.model("meeting", meetingModel);