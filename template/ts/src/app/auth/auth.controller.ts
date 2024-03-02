import { Request, Response } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.middleware";
import { ReadUser, UserDocument, createUser, readUser, updateUser } from "../../db/services/user/user.service";
import { generateToken, hashValue, verifyValue } from "../../utils/auth.utils";
import { httpCodeUtils, responseUtils } from "../../utils/response.utils";
import { ForgotPasswordDocument, deleteForgotPassword, updateForgotPassword } from "../../db/services/forgotPassword/forgotPassword.service";
import { v4 as uuid } from "uuid";
import { RequestWithUser } from "interface/app.interface";
import { setupOrg } from "./auth.service";
import mongoose from "mongoose";
import { OrgDocument } from "db/services/org/org.service";
import { deleteCache } from "../../utils/cache.utils";
import { sendEmail } from "../../utils/sendMail";
import { resetLinkEmailTemplate, verifyLinkEmailTemplate } from "./auth.utils";
import { appConfig } from "../../config/appConfig";

export const signup = errorWrapper(async (req: Request, res: Response) : Promise<Response | void> => {
    const user: ReadUser | null = await readUser({ email: req.body.email }, {});

    if (user && user.count !== 0) {
        return responseUtils(res, {
            status: httpCodeUtils.BAD_REQUEST,
            success: false,
            message: "Email already exists",
            data: null,
        });
    }

    const _user: UserDocument[] | null = await createUser([{
        email: req.body.email,
        password: await hashValue(req.body.password),
        isAdmin: true,
    }]);

    if (!_user || _user.length === 0) {
        return responseUtils(res, {
            status: httpCodeUtils.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Account creation failed",
            data: null,
        });
    }

    await sendEmail({
        to: _user[0].email,
        subject: "Verify Your Account",
        htmlBody: verifyLinkEmailTemplate({
            username: _user[0].name || _user[0].email, 
            verifyLink: `${appConfig.appRoot}/verify/?key=${_user[0]._id.toString()}`
        }),
    });
    
    return responseUtils(res, {
        status: httpCodeUtils.CREATED,
        success: true,
        message: "Account created successfully",
        data: {
            token: await generateToken({ _id: _user[0]._id, email: _user[0].email, isAdmin: _user[0].isAdmin }),
            isOrgCreated: false,
            email: _user[0].email,
            userName: _user[0].name,
            isActive: _user[0].isActive,
        },
    });
});


export const login = errorWrapper(async (req: Request, res: Response): Promise<Response | void> => {
    // check admin login or team login
    let isAdmin: boolean = false;
    if (req.url.includes("/admin/login")) {
        isAdmin = true;
    }

    const user: ReadUser | null = await readUser({ email: req.body.email, isDeleted: false, isAdmin: isAdmin }, {});
    if (user && user.count === 1) {
        const isCorrect: boolean = await verifyValue(req.body.password, user.docs[0].password);
        if (isCorrect) {
            // if the user login first time, then set isActive to true
            if(user.docs[0].isActive === false && user.docs[0].isAdmin === false){
                await updateUser({ _id: user.docs[0]._id }, { isActive: true }, {});
            }
            return responseUtils(res, {
                status: httpCodeUtils.OK,
                success: true,
                message: "Login successful",
                data: {
                    token: await generateToken({ _id: user.docs[0]._id, email: user.docs[0].email, isAdmin: user.docs[0].isAdmin }),
                    email: user.docs[0].email,
                    userName: user.docs[0].name || null,
                    expiresIn: "5d",
                    isOrgCreated: user.docs[0].org !== undefined ? true : false,
                    isActive: user.docs[0].isActive,
                },
            });
        }
    }

    return responseUtils(res, {
        status: httpCodeUtils.UNAUTHORIZED,
        success: false,
        message: "Login failed",
        data: null,
    });
});

export const forgotPassword = errorWrapper(async (req: Request, res: Response) : Promise<Response | void> => {
    const user: ReadUser | null = await readUser({ email: req.body.email, isDeleted: false }, {});
    if (!user || user.count === 0) {
        return responseUtils(res, {
            status: httpCodeUtils.NOT_FOUND,
            success: false,
            message: "User not exist",
            data: null,
        });
    }

    const _uuid : ForgotPasswordDocument | null = await updateForgotPassword({ user: user.docs[0]._id }, { key: uuid() }, { upsert: true, new: true });
    if (!_uuid) {
        return responseUtils(res, {
            status: httpCodeUtils.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }

    await sendEmail({
        to: user.docs[0].email,
        subject: "Password Reset Requested",
        htmlBody: resetLinkEmailTemplate({
            username: user.docs[0].name || user.docs[0].email, 
            resetLink: `${appConfig.appRoot}/reset-password/?key=${_uuid.key}`
        }),
    });
    console.log(_uuid.key);
    
    return responseUtils(res, {
        status: httpCodeUtils.OK,
        success: true,
        message: "Password reset link sent to your email",
        data: null,
    });
});

export const resetPassword = errorWrapper(async (req: Request, res: Response) : Promise<Response | void> => {
    const forgotPassword : ForgotPasswordDocument | null = await deleteForgotPassword({ key: req.body.key }, {});
    if (!forgotPassword) {
        return responseUtils(res, {
            status: httpCodeUtils.BAD_REQUEST,
            success: false,
            message: "Invalid key",
            data: null,
        });
    }

    await updateUser({ _id: forgotPassword.user }, { password: await hashValue(req.body.password) }, {});

    return responseUtils(res, {
        status: httpCodeUtils.OK,
        success: true,
        message: "Password reset successful",
        data: null,
    });
    
});

export const verifyAccount = errorWrapper(async (req: Request, res: Response) : Promise<Response | void> => {

    const user: UserDocument | null = await updateUser({ _id: req.params.key }, { isActive: true }, {});
    if (!user) {
        return responseUtils(res, {
            status: httpCodeUtils.BAD_REQUEST,
            success: false,
            message: "Invalid key",
            data: null,
        });
    }

    // delete user cache to update the key isActive in user cache
    await deleteCache(`user/${req.params.key}`);

    return responseUtils(res, {
        status: httpCodeUtils.OK,
        success: true,
        message: "Account verified successfully",
        data: null,
    });
});

export const resendverifyAccountLink = errorWrapper(async (req: RequestWithUser, res: Response) : Promise<Response | void> => {
    await sendEmail({
        to: req.user.email,
        subject: "Verify Your Account",
        htmlBody: verifyLinkEmailTemplate({
            username: req.user.email, 
            verifyLink: `${appConfig.appRoot}/verify/?key=${req.user._id}`
        }),
    });
    
    return responseUtils(res, {
        status: httpCodeUtils.OK,
        success: true,
        message: "Account verification link sent to your email",
        data: null,
    });
});

export const _setupOrg = errorWrapper(async (req: RequestWithUser, res: Response) : Promise<Response | void> => {
    const org: OrgDocument | null = await setupOrg(req.body.orgName, new mongoose.Types.ObjectId(req.user._id), req.body.roomName, req.body.roomCapacity);
    if (!org) {
        return responseUtils(res, {
            status: httpCodeUtils.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Org creation failed",
            data: null,
        });
    }

    // delete user cache to update the key org in user cache
    await deleteCache(`user/${req.user._id}`);

    await sendEmail({
        to: appConfig.marketingTeam.split(",") || appConfig.sibSource,
        subject: "New Organization Has Registered on BIB!",
        htmlBody: `
        HR: ${req.user.email} <br>
        Organization : ${req.body.orgName}
        `,
    });

    return responseUtils(res, {
        status: httpCodeUtils.CREATED,
        success: true,
        message: "Org created successfully",
        data: null,
    });
});