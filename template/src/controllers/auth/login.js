const { generateAPIError } = require("../../errors/apiError");

const login = async(req, res, next)=>{
    // logic
    return next(generateAPIError('some err', 400))
}

module.exports = {
    login
}