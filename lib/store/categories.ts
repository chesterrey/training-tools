import { create } from "zustand"

type State = {
  categories: {
    id: string
    label: string
    selected: boolean
  }[]
}

type Action = {
  toggleCategory: (id: string) => void
}

export const useCategoryStore = create<State & Action>((set) => ({
  categories: [
    { id: "barbell", label: "Barbell", selected: true },
    { id: "dumbbell", label: "Dumbbell", selected: true },
    { id: "cable", label: "Cable", selected: true },
    { id: "smith", label: "Smith Machine", selected: true },
    { id: "bodyweight", label: "Bodyweight", selected: false },
    { id: "bodyweight+", label: "Bodyweight-loadable", selected: false },
    { id: "machine", label: "Other Machines", selected: false },
  ],
  toggleCategory: (id) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id
          ? { ...category, selected: !category.selected }
          : category
      ),
    })),
}))
