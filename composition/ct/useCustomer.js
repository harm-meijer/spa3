// import { apolloClient, cache } from '../../src/apollo';
// import { getValue } from '../../src/lib';
import useMutation from '../useMutationFacade';
import gql from 'graphql-tag';
const loginMutation = gql`
  mutation customerSignMeIn(
    $draft: CustomerSignMeInDraft!
  ) {
    customerSignMeIn(draft: $draft) {
      customer {
        customerId: id
      }
    }
  }
`;
export const loginVars = (email, password) => ({
  draft: {
    email,
    password,
  },
});

//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useCartMutation = ({ location, currency } = {}) => {
  false && location && currency;
  const [l, { data, loading, error }] =
    useMutation(loginMutation);
  const login = (variables) => l({ variables });
  return {
    data,
    loading,
    error,
    login,
  };
};

export default useCartMutation;
