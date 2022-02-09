import useProducts from '../../../../../composition/useProducts';
// import { ALL } from '../../../../constants';

export default {
  name: 'Products',
  setup() {
    const { total, products, loading, error } = useProducts(
      {
        page: 1,
      }
    );
    return {
      products,
      total,
      loading,
      error,
    };
  },
};
