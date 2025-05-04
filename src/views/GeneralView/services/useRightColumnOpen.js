import { create } from "zustand";

const useRightColumnOpen = create((set) => ({
  rightColumnOpen: false,
  setRightColumnOpen: (val) => set({ rightColumnOpen: val }),
}));

export default useRightColumnOpen;