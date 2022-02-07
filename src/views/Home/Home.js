import gql from 'graphql-tag';
import {
  useQuery,
  useResult,
} from '@vue/apollo-composable';

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;
export default {
  name: 'Home',
  setup() {
    const { result, loading, error } = useQuery(
      CHARACTERS_QUERY
    );
    const characters = useResult(
      result,
      null,
      (data) => data.characters.results
    );
    return {
      characters,
      loading,
      error,
    };
  },
};
