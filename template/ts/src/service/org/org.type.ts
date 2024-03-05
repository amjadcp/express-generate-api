import { FilterQuery, UpdateQuery } from "mongoose";
import orgModel from "../../model/org.model";

export type OrgDocument = InstanceType<typeof orgModel>;
export type ReadOrg = {docs: OrgDocument[], count: number};
export type OrgFilter = FilterQuery<OrgDocument>;
export type OrgUpdate = UpdateQuery<OrgDocument>;