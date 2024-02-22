"use client"

import { useEffect, useState } from "react"
import getExercises from "@/firebase/firestore/getExercises"

import { useCategoryStore } from "@/lib/store/categories"
import { useExerciseStore } from "@/lib/store/exercises"
import { useRoutineStore } from "@/lib/store/routine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import CustomExerciseDialog from "@/app/training-planner/components/custom-exercise"
import ExerciseSkeleton from "@/app/training-planner/components/exercise-skeleton"

function ExerciseSelect({ exercise, day, addExercise, exercises }: any) {
  const [isDisabled, setIsDisabled] = useState(false)

  const { nullifyExercise } = useRoutineStore()

  useEffect(() => {
    if (exercises.length === 0) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [exercises.length])

  useEffect(() => {
    if (isDisabled) {
      nullifyExercise(day.id, exercise.muscle_group)
    } else {
    }
  }, [isDisabled])

  return (
    <div className="flex flex-col space-y-1.5" key={exercise.muscle_group}>
      <Label
        className={`flex justify-between ${
          isDisabled ? "text-muted-foreground cursor-not-allowed" : ""
        }`}
      >
        <p className="capitalize">{exercise.muscle_group.split("-")[0]}</p>
        <p className="italic text-xs font-normal">
          {isDisabled
            ? "(No exercises)"
            : `(${exercise.rep_range[0]}-${exercise.rep_range[1]} reps)`}
        </p>
      </Label>
      <Select
        value={exercise.id}
        onValueChange={(idName) =>
          addExercise(day.id, exercise.muscle_group, idName)
        }
        disabled={isDisabled}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          {exercises.map((exerciseItem: any) => {
            return (
              <SelectItem
                key={exerciseItem.id}
                value={`${exerciseItem.name}$$$${exerciseItem.id}`}
              >
                {exerciseItem.name}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default function ExerciseField() {
  const { routine, addExercise, autofillExercises, validateExercises } =
    useRoutineStore()
  const { exercises, setExercises } = useExerciseStore()
  const { categories } = useCategoryStore()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState({} as any)

  useEffect(() => {
    setLoading(true)
    getExercises().then((exercises: any) => {
      setExercises(exercises.result, categories)
    })
  }, [categories, setExercises])

  useEffect(() => {
    setLoading(true)

    if (categories.filter((c) => c.selected).length === 0) {
      setMessages({
        ...messages,
        category: "Please select at least one exercise category.",
      })
    }

    if (routine.days.length === 0) {
      setMessages({ ...messages, routine: "Please select a routine." })
    }

    if (exercises.length > 0 && routine.days.length > 0) {
      setLoading(false)

      setMessages({
        category: "",
        routine: "",
      })
    }
  }, [exercises, routine, categories])

  useEffect(() => {
    validateExercises(exercises)
  }, [exercises, validateExercises])

  return (
    <>
      <div className="mb-4">
        <Label className="text-lg">Exercise Selection</Label>
        <p className="text-sm text-muted-foreground">
          Select or input your own exercises for each muscle group for each day.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant={"outline"}
          onClick={() => autofillExercises(exercises)}
          disabled={loading}
        >
          Auto-fill
        </Button>
        <CustomExerciseDialog disabled={loading} />
      </div>
      <div>
        {messages.category && (
          <p className="text-sm text-red-500">{messages.category}</p>
        )}
        {messages.routine && (
          <p className="text-sm text-red-500">{messages.routine}</p>
        )}
      </div>

      <Separator />
      {loading ? (
        <ExerciseSkeleton />
      ) : (
        <>
          <ScrollArea className="max-w-[300px] md:max-w-lg lg:max-w-2xl xl:max-w-5xl">
            <div className="flex items-start gap-6 rounded-lg mb-8">
              {routine.days.map((day: any) => {
                return (
                  <Card key={day.id} className="w-[300px]">
                    <CardHeader>
                      <CardTitle className="text-lg">{day.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid w-full items-center gap-4">
                        {day.exercises.map((exercise: any) => {
                          return (
                            <ExerciseSelect
                              key={exercise.muscle_group}
                              exercise={exercise}
                              day={day}
                              addExercise={addExercise}
                              exercises={exercises.filter(
                                (exerciseItem: any) =>
                                  exerciseItem.muscleGroup ===
                                  exercise.muscle_group.split("-")[0]
                              )}
                            />
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <ScrollBar className="mt-4" orientation="horizontal" />
          </ScrollArea>
        </>
      )}
    </>
  )
}
