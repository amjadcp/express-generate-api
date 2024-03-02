import mongoose from "mongoose";
import { RoomDocument } from "./room.service";

export interface RoomDetails extends RoomDocument {
    org: mongoose.Types.ObjectId & {
        _id?: mongoose.Types.ObjectId;
        name?: string;
    }
}

export interface ReadRoomDetails {
    docs: RoomDetails[];
    count: number;
}