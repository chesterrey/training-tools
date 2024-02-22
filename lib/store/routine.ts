import { create } from "zustand"

export type State = {
  routine: {
    id: string
    label: string
    days: {
      id: string
      label: string
      exercises: {
        muscle_group: string
        sets: number[]
        rep_range: number[]
        id: string
      }[]
    }[]
  }
}

type Action = {
  setRoutine: (routine: State["routine"]) => void
  addExercise: (
    dayId: string,
    muscleGroup: string,
    exerciseName: string
  ) => void
  autofillExercises: (exercises: any) => void
  validateExercises: (exercises: any) => void
  nullifyExercise: (dayId: string, muscleGroup: string) => void
}

export const useRoutineStore = create<State & Action>((set) => ({
  // default routine is an empty object
  routine: {
    id: "",
    label: "",
    days: [],
  },
  setRoutine: (routine) => set({ routine }),
  addExercise: (dayId, muscleGroup, exerciseIdName) =>
    set((state) => {
      const days = state.routine.days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map((exercise) => {
              if (exercise.muscle_group === muscleGroup) {
                return { ...exercise, id: exerciseIdName }
              }
              return exercise
            }),
          }
        }
        return day
      })

      return { routine: { ...state.routine, days } }
    }),
  autofillExercises: (exercises: any) =>
    set((state) => {
      const days = state.routine.days.map((day) => {
        return {
          ...day,
          exercises: day.exercises.map((exercise) => {
            const muscleGroupSplit = exercise.muscle_group.split("-")[0]
            const filteredExercises = exercises.filter(
              (e: any) => e.muscleGroup === muscleGroupSplit
            )
            if (filteredExercises.length === 0) {
              return { ...exercise, id: "no-exercise" }
            }
            const rand = Math.floor(Math.random() * filteredExercises.length)
            return {
              ...exercise,
              id: `${filteredExercises[rand].name}$$$${filteredExercises[rand].id}`,
            }
          }),
        }
      })

      return { routine: { ...state.routine, days } }
    }),
  validateExercises: (exercises: any) =>
    set((state) => {
      const exerciseIds = exercises.map((e: any) => e.id)
      const days = state.routine.days.map((day) => {
        return {
          ...day,
          exercises: day.exercises.map((exercise) => {
            return {
              ...exercise,
              id: exerciseIds.includes(exercise.id.split("$$$")[1])
                ? exercise.id
                : "",
            }
          }),
        }
      })

      return { routine: { ...state.routine, days } }
    }),
  nullifyExercise: (dayId, muscleGroup) =>
    set((state) => {
      const days = state.routine.days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map((exercise) => {
              if (exercise.muscle_group === muscleGroup) {
                return { ...exercise, id: "no-exercise" }
              }
              return exercise
            }),
          }
        }
        return day
      })

      return { routine: { ...state.routine, days } }
    }),
}))
