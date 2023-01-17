// /**
//  *
//  * @param {*} fn
//  * @returns
//  */
/**  handles errors inside every req */

const errorWrapper = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (err) {
        next(err);
        // return res.status(500).json({
        //   success: false,
        //   message: err.message,
        //   data: null,
        // });
      }
    };
  };
  
  module.exports = errorWrapper;