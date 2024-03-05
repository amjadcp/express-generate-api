import userModel from "../../model/user.model.js";


export const createUsers = async (doc, session) => {
    return await userModel.insertMany(doc, { session: session });
};

export const readUsers = async (filter, options) => {
    const [docs, count] = await Promise.all([
        userModel.find(filter, {}, options),
        userModel.countDocuments(filter),
    ]);
    return { docs, count};
};

export const updateUser = async (filter, doc, options) => {
    return await userModel.findOneAndUpdate(filter, doc, options);
};

export const updateUsers = async (filter, doc, options) => {
    return await userModel.updateMany(filter, doc, options);
};

export const deleteUsers = async (filter, options) => {
    return await userModel.deleteMany(filter, options);
};

export const aggregateUsers = async (filter, pipeline) => {
    const [docs, count] = await Promise.all([
        userModel.aggregate(pipeline),
        userModel.countDocuments(filter),
    ]);
    return { docs, count};
};