interface Pagination<T> {
  limit: T;
  page: T;
}

export const getPaginationOptions = ({limit,page}: Pagination<number>): { limit: number; skip: number } => {
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
