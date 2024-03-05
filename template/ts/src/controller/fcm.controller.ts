/* eslint-disable @typescript-eslint/naming-convention */
import { errorWrapper } from "../middleware/errorWrapper.middleware";
// import aws from "aws-sdk";
import { Response } from "express";
import { httpCodeUtils, responseUtils } from "../utils/response.utils";
import { RequestWithUser } from "../interface/app.interface";
import { updateUser } from "../service/user/user.service";

const addFCMToken = errorWrapper(async (req: RequestWithUser, res: Response) => {
  await updateUser({ _id: req.user._id }, { $push: {fcmTokens: req.body.token} }, {});
  return responseUtils(res, {
    status: httpCodeUtils.OK,
    success: true,
    message: "FCM token added",
    data: null,
  });
});

const deleteFCMToken = errorWrapper(async (req: RequestWithUser, res: Response) => {
  await updateUser({ _id: req.user._id }, { $pull: {fcmTokens: req.body.token} }, {});
  return responseUtils(res, {
    status: httpCodeUtils.OK,
    success: true,
    message: "FCM token removed",
    data: null,
  });
});

export { 
  addFCMToken,
  deleteFCMToken, 
};
