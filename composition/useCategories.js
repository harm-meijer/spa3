import gql from 'graphql-tag';
import { getValue } from '../src/lib';
import useEffect from './useEffect';
// import { computed } from 'vue';
import useLocale from './useLocale';
import useQuery from './useQueryFacade';
import useState from './useState';

//@todo: we will worry about importing the partials
//  when the cart route is done
const createQuery = (where) =>
  gql`
    query categories($locale: Locale! ${
      where ? ', $where: String!' : ''
    }) {
      categories${where ? '(where: $where)' : ''} {
        count
        total
        results {
          id
          slug(locale: $locale)
        }
      }
    }
  `;
//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const NONE = {};
const useCategories = ({ locale, categorySlug, skip }) => {
  const [categories, setCategories] = useState();
  const [total, setTotal] = useState();
  const [where, setWhere] = useState(NONE);
  const [skipQuery, setSkipQuery] = useState(true);
  useEffect(() => {
    setWhere(
      getValue(categorySlug)
        ? `slug(${getValue(locale)}="${getValue(
            categorySlug
          )}")`
        : NONE
    );
  }, [categorySlug, locale]);
  useEffect(
    () =>
      setSkipQuery(
        getValue(skip) ||
          (getValue(categorySlug) && !getValue(where))
      ),
    [skip, categorySlug, where]
  );
  const { loading, error } = useQuery(createQuery(where), {
    variables: {
      locale,
      where: where === NONE ? null : where,
    },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setCategories(data.categories.results);
      setTotal(data.categories.total);
    },
    skip: skipQuery,
  });
  return { total, categories, loading, error };
};
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
