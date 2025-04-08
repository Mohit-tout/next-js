// lib/pagination.js

export const paginate = (page, pageSize) => {
    const skip = (page - 1) * pageSize;
    return { skip, take: pageSize };
  };
  