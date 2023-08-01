import Admin from "../models/User.js"

const readAdmin = async (id) => {
    const admin = await Admin.findById(id)
    return admin
}