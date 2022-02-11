export const move = (router, route, params, fn) =>
  router[fn]({
    ...route,
    params,
  });
//in React you can just return the obervable
//  because React does not usually have observable
//  in React it will be: export const getValue = (observable) => observable;
export const getValue = (observable) => observable?.value;
