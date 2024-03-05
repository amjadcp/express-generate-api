import orgModel from "../../model/org.model.js";

export const createOrgs = async (doc, session) => {
    return await orgModel.insertMany(doc, { session: session });
};

export const readOrgs = async (filter, options) => {
    const [docs, count] = await Promise.all([
        orgModel.find(filter, {}, options),
        orgModel.countDocuments(filter),
    ]);
    return { docs, count};
};

export const updateOrg = async (filter, doc, options) => {
    return await orgModel.findOneAndUpdate(filter, doc, options);
};

export const updateOrgs = async (filter, doc, options) => {
    return await orgModel.updateMany(filter, doc, options);
};

export const deleteOrgs = async (filter, options) => {
    return await orgModel.deleteMany(filter, options);
};

export const aggregateOrgs = async (filter, pipeline) => {
    const [docs, count] = await Promise.all([
        orgModel.aggregate(pipeline),
        orgModel.countDocuments(filter),
    ]);
    return { docs, count};
};