import { create } from "zustand";

export const useActivitiesStore = create((set) => ({
    activities: [],
    setActivities: (newActivities) => set({ activities: newActivities }),
    clearActivities: () => {
      localStorage.removeItem("Latest Activity");
      set(() => ({ activities: [] }));
    },
  }));

  export const useLeftStore = create((set) => ({
    left: false,
    setLeft: (newLeft) => set({ left: newLeft }),
  }));

