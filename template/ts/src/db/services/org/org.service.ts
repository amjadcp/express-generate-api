import { FilterQuery, QueryOptions, UpdateQuery, UpdateWriteOpResult, ClientSession } from "mongoose";
import orgModel from "../../models/org.model";
import { DeleteMany } from "../../../interface/app.interface";

export type OrgDocument = InstanceType<typeof orgModel>;
export type ReadOrg = {docs: OrgDocument[], count: number};
type OrgFilter = FilterQuery<OrgDocument>;
type OrgUpdate = UpdateQuery<OrgDocument>;


export const createOrg = async (doc: Partial<OrgDocument>[], session?: ClientSession) : Promise<OrgDocument[] | null> => {
    return await orgModel.insertMany(doc, { session: session });
};

export const readOrg = async (filter: OrgFilter, options: QueryOptions) : Promise<ReadOrg | null> => {
    const [docs, count] = await Promise.all([
        orgModel.find(filter, {}, options),
        orgModel.countDocuments(filter),
    ]);
    return { docs, count};
};

export const updateOrg = async (filter: OrgFilter, doc: OrgUpdate, options: QueryOptions) : Promise<OrgDocument | null> => {
    return await orgModel.findOneAndUpdate(filter, doc, options);
};

export const updateOrgs = async (filter: OrgFilter, doc: OrgUpdate, options: QueryOptions) : Promise<UpdateWriteOpResult | null> => {
    return await orgModel.updateMany(filter, doc, options);
};

export const deleteOrg = async (filter: OrgFilter, options: QueryOptions) : Promise<DeleteMany> => {
    return await orgModel.deleteMany(filter, options);
};