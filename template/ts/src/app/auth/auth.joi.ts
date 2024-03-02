import joi from "joi";

export const signupSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is a required field",
    }),
    password: joi.string().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).required().messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
        "any.required": "Password is a required field",
    }),
});

export const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is a required field",
    }),
    password: joi.string().required().messages({
        "any.required": "Password is a required field",
    })
});

export const forgotPasswordSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is a required field",
    }),
});

export const resetPasswordSchema = joi.object({
    key: joi.string().required().messages({
        "any.required": "Key is a required field",
    }),
    password: joi.string().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).required().messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
        "any.required": "Password is a required field",
    }),
});

export const setupOrgSchema = joi.object({
    orgName: joi.string().min(3).required().messages({
        "any.required": "Organization name is a required field",
        "string.min": "Organization name must be at least 3 characters long",
    }),
    roomName: joi.string().min(3).required().messages({
        "any.required": "Room name is a required field",
        "string.min": "Room name must be at least 3 characters long",
    }),
    roomCapacity: joi.number().min(2).required().messages({
        "any.required": "Capacity is a required field",
        "number.min": "Capacity must be at least 4",
    }),
});

export const verifyAccountSchema = joi.object({
    key: joi.string().required().messages({
        "any.required": "Id is a required field",
    }),
});