// import { apolloClient, cache } from '../../src/apollo';
// import { getValue } from '../../src/lib';
// import useMutation from '../useMutationFacade';
import gql from 'graphql-tag';
import { loginToken } from '../../src/apollo/auth';
import { cache, apolloClient } from '../../src/apollo';

export const loginVars = (email, password) => ({
  draft: {
    email,
    password,
  },
});
const login = (email, password) =>
  apolloClient
    .mutate({
      mutation: gql`
        mutation customerSignMeIn(
          $draft: CustomerSignMeInDraft!
        ) {
          customerSignMeIn(draft: $draft) {
            customer {
              id
            }
          }
        }
      `,
      variables: loginVars(email, password),
    })
    .then(() =>
      loginToken(email, password).then(() => cache.reset())
    );

//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useCartMutation = ({ location, currency } = {}) => {
  false && location && currency;
  //do we need to do this to transfer cart?
  return {
    login,
  };
};

export default useCartMutation;
