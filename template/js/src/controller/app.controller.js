import { httpCodeUtils, responseUtils } from "../utils/response.utils.js";
import { errorWrapper } from "../middleware/errorWrapper.middleware.js";

const healthCheck = errorWrapper(
  async (req, res) => {
    return responseUtils(res, {
      status: httpCodeUtils.OK,
      success: true,
      message: "Server is up and running",
      data: {
        message: "Server is up and running",
        timestamp: new Date().toISOString(),
      },
    });
  },
);

export { healthCheck };
