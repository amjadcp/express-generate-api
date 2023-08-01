import { generateAPIError } from "../../errors/apiError.js";
import {errorWrapper}  from "../../middleware/errorWrapper.js";


const login = errorWrapper(async(req, res, next)=>{
    // logic

    return next(generateAPIError('some err', 400))
})

export {
    login
}