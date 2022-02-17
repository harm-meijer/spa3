import { ref } from 'vue';
import useProducts from '../../composition/ct/useProducts';
import { useQuery } from '@vue/apollo-composable';
jest.mock('@vue/apollo-composable', () => {
  const { ref } = require('vue');
  const result = ref({
    productProjectionSearch: {
      results: [],
    },
  });
  return {
    ...jest.requireActual('@vue/apollo-composable'),
    useQuery: jest.fn(() => {
      return { result };
    }),
  };
});
jest.mock('vue', () => {
  return {
    ...jest.requireActual('vue'),
    onMounted: jest.fn((fn) => fn()),
  };
});
jest.mock('../../composition/useCategories', () => {
  const { ref } = require('vue');
  const categories = ref([]);
  return jest.fn(() => ({ categories }));
});

const createParams = (params = {}) => ({
  locale: ref('en'),
  limit: ref(2),
  offset: ref(0),
  currency: ref('EUR'),
  country: ref('DE'),
  sorts: ref(null),
  categorySlug: ref(null),
  sku: ref(null),
  expand: {},
  ...params,
});
describe('useProducts', () => {
  it('returns 43', () => {
    const params = createParams();
    useProducts(params);
    expect(useQuery.mock.calls[0][1].locale.value).toBe(
      'en'
    );
    params.locale.value = 'de';
    expect(useQuery.mock.calls.length).toBe('de');

    // expect(useQuery).toHaveBeenCalledWith(1, 2);
    expect(true).toEqual(true);
  });
});
