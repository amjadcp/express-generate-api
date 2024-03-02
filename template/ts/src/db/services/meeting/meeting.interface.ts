import mongoose from "mongoose";
import { MeetingDocument } from "./meeting.service";

export interface MeetingDetails extends MeetingDocument {
    room: mongoose.Types.ObjectId & {
        _id?: mongoose.Types.ObjectId;
        name?: string;
    };
    org: mongoose.Types.ObjectId & {
        _id?: mongoose.Types.ObjectId;
        name?: string;
    };
    bookedBy: mongoose.Types.ObjectId & {
        _id?: mongoose.Types.ObjectId;
        name?: string;
        email?: string;
        googleRefreshToken?: string;
    };
}

export interface ReadMeetingDetails {
    docs: MeetingDetails[];
    count: number;
}