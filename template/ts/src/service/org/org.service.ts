import { QueryOptions, UpdateWriteOpResult, ClientSession, PipelineStage } from "mongoose";
import orgModel from "../../model/org.model";
import { OrgDocument, OrgFilter, OrgUpdate, ReadOrg } from "./org.type";
import { DeleteMany } from "../../interface/app.interface";



export const createOrgs = async (doc: Partial<OrgDocument>[], session?: ClientSession) : Promise<OrgDocument[] | null> => {
    return await orgModel.insertMany(doc, { session: session });
};

export const readOrgs = async (filter: OrgFilter, options: QueryOptions) : Promise<ReadOrg | null> => {
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

export const deleteOrgs = async (filter: OrgFilter, options: QueryOptions) : Promise<DeleteMany> => {
    return await orgModel.deleteMany(filter, options);
};

export const aggregateOrgs = async (filter: OrgFilter, pipeline: PipelineStage[]) : Promise<ReadOrg | null> => {
    const [docs, count] = await Promise.all([
        orgModel.aggregate(pipeline),
        orgModel.countDocuments(filter),
    ]);
    return { docs, count};
};