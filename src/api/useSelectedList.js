import { create } from "zustand";

const useSelectedList = create((set) => ({
  selectedList: [],
  setSelectedList: (list) => set({ selectedList: list }),
}));

export default useSelectedList;