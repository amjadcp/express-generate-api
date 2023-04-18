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
        console.log(err);
      }
    };
  };
  
  module.exports = {errorWrapper};