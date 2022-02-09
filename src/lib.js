export const move = (router, route, params, fn) =>
  router[fn]({
    ...route,
    params,
  });
