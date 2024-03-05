import { FilterQuery, QueryOptions, UpdateQuery, UpdateWriteOpResult, ClientSession, PipelineStage } from "mongoose";
import userModel from "../../model/user.model";
import { DeleteMany } from "../../interface/app.interface";
import { UserDocument, UserFilter, ReadUser, UserUpdate } from "./user.type";


export const createUsers = async (doc: Partial<UserDocument>[], session?: ClientSession): Promise<UserDocument[] | null> => {
    return await userModel.insertMany(doc, { session: session });
};

export const readUsers = async (filter: UserFilter, options: QueryOptions): Promise<ReadUser | null> => {
    const [docs, count] = await Promise.all([
        userModel.find(filter, {}, options),
        userModel.countDocuments(filter),
    ]);
    return { docs, count};
};

export const updateUser = async (filter: UserFilter, doc: UserUpdate, options: QueryOptions): Promise<UserDocument | null> => {
    return await userModel.findOneAndUpdate(filter, doc, options);
};

export const updateUsers = async (filter: UserFilter, doc: UserUpdate, options: QueryOptions): Promise<UpdateWriteOpResult | null> => {
    return await userModel.updateMany(filter, doc, options);
};

export const deleteUsers = async (filter: UserFilter, options: QueryOptions): Promise<DeleteMany> => {
    return await userModel.deleteMany(filter, options);
};

export const aggregateUsers = async (filter: UserFilter, pipeline: PipelineStage[]) : Promise<ReadUser | null> => {
    const [docs, count] = await Promise.all([
        userModel.aggregate(pipeline),
        userModel.countDocuments(filter),
    ]);
    return { docs, count};
};