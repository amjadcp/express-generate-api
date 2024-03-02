import { Request, Response} from "express";

import { httpCodeUtils, responseUtils } from "../utils/response.utils";
import { errorWrapper } from "../middleware/errorWrapper.middleware";

const healthCheck = errorWrapper(
  async (req: Request, res: Response) => {
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
