import { create } from "zustand"

type State = any
type Action = any

export const useExerciseStore = create((set: any) => ({
  exercises: [],
  setExercises: (exercises: any, categories: any) => {
    const categoryIds = categories
      .filter((category: any) => category.selected)
      .map((category: any) => category.id)
    return set((state: any) => ({
      ...state,
      exercises: exercises.filter((exercise: any) => {
        return categoryIds.includes(exercise.category)
      }),
    }))
  },
  createCustomExercise: (muscleGroup: string, exerciseName: string) => {
    set((state: any) => {
      const id = Math.random().toString(36).substring(7)
      const newExercise = {
        id: id,
        name: exerciseName,
        category: "custom",
        muscleGroup: muscleGroup,
      }
      return { exercises: [...state.exercises, newExercise] }
    })
  },
}))
