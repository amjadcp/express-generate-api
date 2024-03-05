import { Request, Response } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.middleware";
import { createUsers, readUsers, updateUser } from "../../service/user/user.service";
import { generateToken, hashValue, verifyValue } from "../../utils/auth.utils";
import { httpCodeUtils, responseUtils } from "../../utils/response.utils";
import { ReadUser, UserDocument } from "../../service/user/user.type";

export const signup = errorWrapper(async (req: Request, res: Response) : Promise<Response | void> => {
    const user: ReadUser | null = await readUsers({ email: req.body.email }, {});

    if (user && user.count !== 0) {
        return responseUtils(res, {
            status: httpCodeUtils.BAD_REQUEST,
            success: false,
            message: "Email already exists",
            data: null,
        });
    }

    const _user: UserDocument[] | null = await createUsers([{
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

    const user: ReadUser | null = await readUsers({ email: req.body.email, isDeleted: false, isAdmin: isAdmin }, {});
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