import { create } from "zustand"

type State = {
  weeks: string
}

type Action = {
  setWeeks: (weeks: string) => void
}

export const useWeekStore = create<State & Action>((set) => ({
  weeks: "4",
  setWeeks: (weeks) => set({ weeks }),
}))
