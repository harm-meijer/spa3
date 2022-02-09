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
  const setData = (result) => {
    if (typeof onCompleted === 'function') {
      onCompleted(result);
    }
    data.value = result;
  };
  watch(result, setData);
  //make hot module reloading work
  if (result.value) {
    setData(result.value);
  }
  return { data, loading, error };
};
