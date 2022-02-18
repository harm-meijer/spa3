import { shallowRef } from 'vue';
import { CHANNEL } from '../src/constants';
const channel = shallowRef(
  // JSON.parse(localStorage.getItem(CHANNEL)) || ''
  localStorage.getItem(CHANNEL) || ''
);
//@todo: channel should be an object
const useChannel = () => {
  const setChannel = (newChannel) => {
    channel.value = newChannel;
    // localStorage.setItem(CHANNEL, JSON.stringify(channel));
    localStorage.setItem(CHANNEL, newChannel);
  };
  return { channel, setChannel };
};
export default useChannel;
