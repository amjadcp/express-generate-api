import { FilterQuery, UpdateQuery } from "mongoose";
import userModel from "../../model/user.model";


export type UserDocument = InstanceType<typeof userModel>;
export type ReadUser = {docs: UserDocument[], count: number};
export type UserFilter = FilterQuery<UserDocument>;
export type UserUpdate = UpdateQuery<UserDocument>;