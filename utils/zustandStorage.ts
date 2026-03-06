import { StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv'

const mmkv = createMMKV();
const zustandStorage: StateStorage = {
  getItem: (name) => {
    return mmkv.getString(name) || null
  },
  setItem: (name, value) => {
    return mmkv.set(name, value)
  },
  removeItem: (name) => {
    return mmkv.remove(name)
  }
}
export default zustandStorage;
