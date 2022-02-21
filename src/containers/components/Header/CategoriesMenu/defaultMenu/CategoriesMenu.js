import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useCategories from 'hooks/useCategories';
import useLocale from 'hooks/useLocale';
import CategoriesMenuPresentation from 'presentation/Header/CategoriesMenu';

export default {
  name: 'CategoriesMenu',
  components: {
    CategoriesMenuPresentation,
  },
  setup() {
    const route = useRoute();
    const { categories } = useCategories({
      rootOnly: ref(true),
      sort: ref(['orderHint asc']),
    });
    const { locale } = useLocale();
    const isActive = (slug) =>
      slug === route.params.categorySlug;
    return {
      locale,
      categories,
      isActive,
    };
  },
};
