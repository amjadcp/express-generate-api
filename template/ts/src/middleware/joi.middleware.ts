import { Request, Response, NextFunction } from "express";
import type { ObjectSchema, ArraySchema, ValidationErrorItem } from "joi";
import { httpCodeUtils, responseUtils } from "../utils/response.utils";

const JoiValidator = (
    validationSchema:
        | ObjectSchema
        | ArraySchema
        | (() => Promise<ObjectSchema | ArraySchema>),
    type: "body" | "query" | "params" = "body"
) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
        const data = req.body;
        let Schema: ObjectSchema | ArraySchema;
        if (typeof validationSchema === "function") {
            Schema = await validationSchema();
        } else {
            Schema = validationSchema;
        }
        const { value, error } = Schema.validate(data);
        if (error) {
            const message = error.details
                .map((err: ValidationErrorItem) => err.message)
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
