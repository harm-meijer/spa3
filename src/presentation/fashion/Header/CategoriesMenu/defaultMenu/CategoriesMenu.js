import gql from 'graphql-tag';

export default {
  name: 'CategoriesMenu',
  data: () => ({
    categories: null,
  }),
  props: {
    locale: {
      type: String,
      required: true,
    },
  },
  apollo: {
    categories: {
      query: gql`
        query categories($locale: Locale!) {
          categories(
            limit: 10
            where: "parent is not defined"
            sort: "orderHint asc"
          ) {
            results {
              ...MenuCategoryInfo
            }
          }
        }
        fragment MenuCategoryInfo on Category {
          id
          externalId
          name(locale: $locale)
          slug(locale: $locale)
          orderHint
        }
      `,
      variables() {
        return {
          locale: this.locale,
        };
      },
    },
  },
};
