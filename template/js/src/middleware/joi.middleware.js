import { httpCodeUtils, responseUtils } from "../utils/response.utils.js";

const JoiValidator = (
    validationSchema,
    type = "body"
) => {
    return async (req, res, next) => {
        const data = req.body;
        let Schema;
        if (typeof validationSchema === "function") {
            Schema = await validationSchema();
        } else {
            Schema = validationSchema;
        }
        const { value, error } = Schema.validate(data);
        if (error) {
            const message = error.details
                .map((err) => err.message)
                .join(", ");
            return responseUtils(res, {
                status: httpCodeUtils.BAD_REQUEST,
                success: false,
                message,
                data: null,
            });
        } else {
            switch (type) {
                case "body":
                    req.body = value;
                    break;
                case "query":
                    req.query = value;
                    break;
                case "params":
                    req.params = value;
                    break;
                default:
                    break;
            }
            return next();
        }
    };
};

export default JoiValidator;
