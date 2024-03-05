import { errorWrapper } from "../middleware/errorWrapper.middleware.js";
// import aws from "aws-sdk";
import { httpCodeUtils, responseUtils } from "../utils/response.utils.js";
import { updateUser } from "../service/user/user.service.js";

const addFCMToken = errorWrapper(async (req, res) => {
  await updateUser({ _id: req.user._id }, { $push: {fcmTokens: req.body.token} }, {});
  return responseUtils(res, {
    status: httpCodeUtils.OK,
    success: true,
    message: "FCM token added",
    data: null,
  });
});

const deleteFCMToken = errorWrapper(async (req, res) => {
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
