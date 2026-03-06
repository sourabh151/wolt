import { createMMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

const mmkv = createMMKV();

const zustandStorage: StateStorage = {
  getItem: (name) => {
    const data = mmkv.getString(name);
    return data ?? null;
  },
  setItem: (name, value) => {
    return mmkv.set(name, value);
  },
  removeItem: (name) => {
    return mmkv.remove(name)
  }
};

export default zustandStorage;
