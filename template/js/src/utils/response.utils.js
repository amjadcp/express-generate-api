export const responseUtils = (res, {status, success, message, data})=>{
  return res.status(status).send({ 
    statusCode: status,
    success,
    message,
    data, 
  });
};

export const httpCodeUtils = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
