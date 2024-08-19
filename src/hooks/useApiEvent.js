import {create} from "zustand";

const useApiEvent = create((set) => ({
  apiEvent: '',
  setApiEvent: (event) => {
    set({ apiEvent: event });
    setTimeout(() => {
      set({ apiEvent: '' })
    }, 500)
  }
}));

export default useApiEvent;