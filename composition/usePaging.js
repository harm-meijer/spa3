//@todo: calculate total pages
export default (
  page = 1,
  pageSize = process.env.VUE_APP_PAGE_SIZE
) => {
  const limit = Number(pageSize);
  return { limit, offset: (page - 1) * limit };
};
