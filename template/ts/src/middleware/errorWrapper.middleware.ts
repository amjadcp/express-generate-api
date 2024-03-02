// /**
//  *
//  * @param {*} fn
//  * @returns
//  */
/**  handles errors inside every req */

import { Response, Request, NextFunction } from "express";
import { responseUtils, httpCodeUtils } from "../utils/response.utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorWrapper = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log(err, "error");
      return responseUtils(res, {
        status: httpCodeUtils.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
        data: null,
      });
    }
  };
};

export { errorWrapper };
