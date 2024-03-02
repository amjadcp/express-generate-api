import { FilterQuery, QueryOptions, UpdateQuery, UpdateWriteOpResult, ClientSession } from "mongoose";
import userModel from "../../models/user.model";
import { DeleteMany } from "../../../interface/app.interface";

export type UserDocument = InstanceType<typeof userModel>;
export type ReadUser = {docs: UserDocument[], count: number};
type UserFilter = FilterQuery<UserDocument>;
type UserUpdate = UpdateQuery<UserDocument>;


export const createUser = async (doc: Partial<UserDocument>[], session?: ClientSession): Promise<UserDocument[] | null> => {
    return await userModel.insertMany(doc, { session: session });
};

export const readUser = async (filter: UserFilter, options: QueryOptions): Promise<ReadUser | null> => {
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

export const deleteUser = async (filter: UserFilter, options: QueryOptions): Promise<DeleteMany> => {
    return await userModel.deleteMany(filter, options);
};