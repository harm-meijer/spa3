import useLocale from './useLocale';
import useCategories from './ct/useCategories';
//vue specific useCategories
export default ({ categorySlug, skip }) => {
  const { locale } = useLocale();

  const { total, categories, loading, error } =
    useCategories({
      locale,
      categorySlug,
      skip,
    });
  return { total, categories, loading, error };
};
