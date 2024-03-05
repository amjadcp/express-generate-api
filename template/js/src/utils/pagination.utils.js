export const getPaginationOptions = ({limit,page}) => {
  if (limit > 30) {
    limit = 30;
  }
  const newLimit = limit;
  const skip = (page - 1) * limit;

  return {
    limit: newLimit,
    skip,
  };
};
