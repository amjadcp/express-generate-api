const { generateAPIError } = require("../../errors/apiError");
const errorWrapper = require("../../middleware/errorWrapper");

module.exports.login = errorWrapper(async(req, res, next)=>{
    // logic

    return next(generateAPIError('some err', 400))
})