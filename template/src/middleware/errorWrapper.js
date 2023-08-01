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
        console.log(err);
        next(err);
      }
    };
};
  
export {errorWrapper};