import { create } from "zustand"

type State = any
type Action = any

export const useRoutineCollectionStore = create((set: any) => ({
  routineCollection: [],
  setRoutineCollection: (routines: any) => {
    return set((state: any) => ({
      ...state,
      routineCollection: routines,
    }))
  },
}))
