import { ref, watch } from 'vue';
import { getValue } from '../src/lib';

//@todo: calculate total pages
//this should work in react
const usePage = (
  page = 1,
  pageSize = process.env.VUE_APP_PAGE_SIZE
) => {
  const limit = Number(pageSize);
  return { limit, offset: (page - 1) * limit };
};
//vue specific implementation
export default (
  page,
  pageSize = process.env.VUE_APP_PAGE_SIZE
) => {
  const info = usePage(getValue(page), pageSize);
  const limit = ref(info.limit);
  const offset = ref(info.offset);
  watch(page, (page) => {
    const { limit: l, offset: o } = usePage(page, pageSize);
    limit.value = l;
    offset.value = o;
  });
  return { limit, offset };
};
