import { onMounted, watch } from 'vue';

const useEffect = (fn, deps) => {
  onMounted(fn);
  watch(deps, fn);
};
export default useEffect;
