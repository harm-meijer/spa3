import gql from 'graphql-tag';
import { useResult } from '@vue/apollo-composable';
import useQueryFacade from '../../../../../composition/useQueryFacade';

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
    const { result, loading, error } = useQueryFacade(
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
