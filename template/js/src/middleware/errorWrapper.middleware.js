// /**
//  *
//  * @param {*} fn
//  * @returns
//  */
/**  handles errors inside every req */

import { responseUtils, httpCodeUtils } from "../utils/response.utils.js";

const errorWrapper = (fn) => {
  return async (req, res, next) => {
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
