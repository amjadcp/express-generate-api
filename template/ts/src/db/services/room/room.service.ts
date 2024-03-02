import { FilterQuery, QueryOptions, UpdateQuery, UpdateWriteOpResult, ClientSession } from "mongoose";
import roomModel from "../../models/room.model";
import { DeleteMany } from "../../../interface/app.interface";
import { deleteMeeting } from "../meeting/meeting.service";

export type RoomDocument = InstanceType<typeof roomModel>;
export type ReadRoom = {docs: RoomDocument[], count: number};
type RoomFilter = FilterQuery<RoomDocument>;
type RoomUpdate = UpdateQuery<RoomDocument>;


export const createRoom = async (doc: Partial<RoomDocument>[], session?: ClientSession) : Promise<RoomDocument[] | null> => {
    return await roomModel.insertMany(doc, { session: session });
};

export const readRoom = async (filter: RoomFilter, options: QueryOptions) : Promise<ReadRoom | null> => {
    const [docs, count] = await Promise.all([
        roomModel.find(filter, {}, options),
        roomModel.countDocuments(filter),
    ]);
    return { docs, count};
};

export const updateRoom = async (filter: RoomFilter, doc: RoomUpdate, options: QueryOptions) : Promise<RoomDocument | null> => {
    return await roomModel.findOneAndUpdate(filter, doc, options);
};

export const updateRooms = async (filter: RoomFilter, doc: RoomUpdate, options: QueryOptions) : Promise<UpdateWriteOpResult | null> => {
    return await roomModel.updateMany(filter, doc, options);
};

export const deleteRoom = async (filter: RoomFilter, options: QueryOptions) : Promise<DeleteMany> => {
    await deleteMeeting({ room: filter._id }, {});
    return await roomModel.deleteMany(filter, options);
};