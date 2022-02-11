import { ref } from 'vue';
import { getValue } from '../src/lib';

export default (initialState) => {
  const state = ref(initialState);
  const setter = (newValue) =>
    typeof newValue === 'function'
      ? (state.value = newValue(getValue(state)))
      : (state.value = newValue);
  return [state, setter];
};
