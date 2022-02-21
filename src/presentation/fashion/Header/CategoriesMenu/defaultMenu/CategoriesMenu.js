import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useCategories from '../../../../../../composition/useCategories';

export default {
  name: 'CategoriesMenu',
  props: {
    locale: {
      type: String,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const { categories } = useCategories({
      rootOnly: ref(true),
      sort: ref(['orderHint asc']),
    });
    const isActive = (slug) =>
      slug === route.params.categorySlug;
    return {
      categories,
      isActive,
    };
  },
};
