import { useQuery } from '@vue/apollo-composable';
import { ref, watch } from 'vue';

//adjust React useQuery to vue apollo
export default (
  query,
  { variables, onCompleted, ...options }
) => {
  const data = ref();
  const { result, loading, error } = useQuery(
    query,
    variables,
    options
  );
  watch(
    () => result.value,
    (result) => {
      if (typeof onCompleted === 'function') {
        onCompleted(result);
      }
      data.value = result;
    }
  );
  return { data, loading, error };
};
