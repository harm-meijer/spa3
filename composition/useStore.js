import { shallowRef } from 'vue';
import { STORE } from '../src/constants';
const store = shallowRef(
  // JSON.parse(localStorage.getItem(STORE)) || ''
  localStorage.getItem(STORE) || ''
);
//@todo: store should be an object
const useStore = () => {
  const setStore = (newStore) => {
    store.value = newStore;
    // localStorage.setItem(STORE, JSON.stringify(newStore));
    localStorage.setItem(STORE, newStore);
  };
  return { store, setStore };
};
export default useStore;
