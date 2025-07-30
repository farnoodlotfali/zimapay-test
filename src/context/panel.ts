import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  showSideBar: boolean;
  showDrawer: boolean;
}

const initialState: State = {
  showSideBar: true,
  showDrawer: false,
};

interface Actions {
  toggleSideBar: () => void;
  toggleDrawer: () => void;

  reset: () => void;
}

export const usePanelStore = create<State & Actions>()(
  immer((set, get) => ({
    ...initialState,
    toggleSideBar: () =>
      set((state) => {
        state.showSideBar = !get().showSideBar;
      }),
    toggleDrawer: () =>
      set((state) => {
        state.showDrawer = !get().showDrawer;
      }),

    reset: () => {
      set(() => initialState);
    },
  }))
);
