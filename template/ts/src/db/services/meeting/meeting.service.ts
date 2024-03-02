import { FilterQuery, QueryOptions, UpdateQuery, UpdateWriteOpResult, PipelineStage, ClientSession } from "mongoose";
import meetingModel from "../../models/meeting.model.ts";
import { DeleteMany } from "interface/app.interface.js";

export type MeetingDocument = InstanceType<typeof meetingModel>;
export type ReadMeeting = {docs: MeetingDocument[], count: number};
export type MeetingFilter = FilterQuery<MeetingDocument>;
type MeetingUpdate = UpdateQuery<MeetingDocument>;


export const createMeeting = async (doc: Partial<MeetingDocument>[], session?: ClientSession) : Promise<MeetingDocument[] | null> => {
    return await meetingModel.insertMany(doc, { session: session, populate: { path: "bookedBy", select: "name email" } });
};

export const readMeeting = async (filter: MeetingFilter, options: QueryOptions) : Promise<ReadMeeting | null> => {
    const [docs, count] = await Promise.all([
        meetingModel.find(filter, {}, options),
        meetingModel.countDocuments(filter),
    ]);
    return { docs, count};
};

export const aggregateMeeting = async (filter: MeetingFilter, pipeline: PipelineStage[]) : Promise<ReadMeeting | null> => {
    const [docs, count] = await Promise.all([
        meetingModel.aggregate(pipeline),
        meetingModel.countDocuments(filter),
    ]);
    return { docs, count};
};

export const updateMeeting = async (filter: MeetingFilter, doc: MeetingUpdate, options: QueryOptions) : Promise<MeetingDocument | null> => {
    return await meetingModel.findOneAndUpdate(filter, doc, options);
};

export const updateMeetings = async (filter: MeetingFilter, doc: MeetingUpdate, options: QueryOptions) : Promise<UpdateWriteOpResult | null> => {
    return await meetingModel.updateMany(filter, doc, options);
};

export const deleteMeeting = async (filter: MeetingFilter, options: QueryOptions) : Promise<MeetingDocument | null> => {
    return await meetingModel.findOneAndDelete(filter, options);
};

export const deleteMeetings = async (filter: MeetingFilter, options: QueryOptions) : Promise<DeleteMany> => {
    return await meetingModel.deleteMany(filter, options);
};