import { FilterQuery, QueryOptions, UpdateQuery, UpdateWriteOpResult, ClientSession } from "mongoose";
import forgotPasswordModel from "../../models/forgotPassword.model";
import { DeleteMany } from "../../../interface/app.interface";

export type ForgotPasswordDocument = InstanceType<typeof forgotPasswordModel>;
type ForgotPasswordFilter = FilterQuery<ForgotPasswordDocument>;
type ForgotPasswordUpdate = UpdateQuery<ForgotPasswordDocument>;


export const createForgotPassword = async (org: Partial<ForgotPasswordDocument>[], session?: ClientSession) : Promise<ForgotPasswordDocument[] | null> => {
    return await forgotPasswordModel.insertMany(org, { session: session });
};

export const readForgotPassword = async (filter: ForgotPasswordFilter, options: QueryOptions) : Promise<ForgotPasswordDocument[] | null> => {
    return await forgotPasswordModel.find(filter, {}, options);
};

export const updateForgotPassword = async (filter: ForgotPasswordFilter, doc: ForgotPasswordUpdate, options: QueryOptions) : Promise<ForgotPasswordDocument | null> => {
    return await forgotPasswordModel.findOneAndUpdate(filter, doc, options);
};

export const updateForgotPasswords = async (filter: ForgotPasswordFilter, doc: ForgotPasswordUpdate, options: QueryOptions) : Promise<UpdateWriteOpResult | null> => {
    return await forgotPasswordModel.updateMany(filter, doc, options);
};

export const deleteForgotPassword = async (filter: ForgotPasswordFilter, options: QueryOptions) : Promise<ForgotPasswordDocument | null> => {
    return await forgotPasswordModel.findOneAndDelete(filter, options);
};

export const deleteForgotPasswords = async (filter: ForgotPasswordFilter, options: QueryOptions) : Promise<DeleteMany> => {
    return await forgotPasswordModel.deleteMany(filter, options);
};