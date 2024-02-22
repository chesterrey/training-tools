import React, { useState } from "react"

import { useExerciseStore } from "@/lib/store/exercises"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const muscleGroups = [
  { id: "chest", label: "Chest" },
  { id: "back", label: "Back" },
  { id: "shoulders", label: "Shoulders" },
  { id: "triceps", label: "Triceps" },
  { id: "biceps", label: "Biceps" },
  { id: "traps", label: "Traps" },
  { id: "quads", label: "Quads" },
  { id: "hamstrings", label: "Hamstrings" },
  { id: "glutes", label: "Glutes" },
  { id: "calves", label: "Calves" },
]

export default function CustomExerciseDialog({ disabled }: any) {
  const [open, setOpen] = useState(false)

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("")
  const [inputExercise, setInputExercise] = useState("")

  const { createCustomExercise } = useExerciseStore()

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={disabled} variant={"outline"}>
            Custom exercise
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom exercise</DialogTitle>
            <DialogDescription>
              Add a custom exercise to the list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="custom-exercise">Muscle Group</Label>
              <Select
                value={selectedMuscleGroup}
                onValueChange={setSelectedMuscleGroup}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select muscle group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {muscleGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="custom-exercise">Exercise</Label>
              <Input
                id="custom-exercise"
                placeholder="e.g. Stiff-legged Deadlift"
                value={inputExercise}
                onChange={(e) => setInputExercise(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                if (selectedMuscleGroup && inputExercise) {
                  createCustomExercise(selectedMuscleGroup, inputExercise)
                  setSelectedMuscleGroup("")
                  setInputExercise("")
                  setOpen(false)
                }
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
