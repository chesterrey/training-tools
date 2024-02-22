"use client"

import { useEffect, useState } from "react"

import { downloadPDF } from "@/lib/pdfmake/pdfmakeService"
import { useExerciseStore } from "@/lib/store/exercises"
import { useRoutineStore } from "@/lib/store/routine"
import { useWeekStore } from "@/lib/store/weeks"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import CategoriesField from "@/app/training-planner/hypertrophy/categories-field"
import ExerciseField from "@/app/training-planner/hypertrophy/exercise-field"
import RoutineField from "@/app/training-planner/hypertrophy/routine-field"
import WeekField from "@/app/training-planner/hypertrophy/week-field"

// This can come from your database or API.

export function HypertrophyForm() {
  const { routine } = useRoutineStore()
  const { weeks } = useWeekStore()
  const { exercises } = useExerciseStore()
  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setError(false)
  }, [routine])

  useEffect(() => {
    if (exercises.length > 0 && routine.days.length > 0) {
      setLoading(false)
    }
  }, [exercises, routine])

  const handleDownload = () => {
    const hasMissingExercises = routine.days.some((day) =>
      day.exercises.some((exercise) => exercise.id === "")
    )

    if (hasMissingExercises) {
      setError(true)
      return
    }

    setError(false)
    downloadPDF(routine, parseInt(weeks))
  }

  return (
    <div className="space-y-8">
      <CategoriesField />
      <Separator />
      <WeekField />
      <Separator />
      <RoutineField />
      <Separator />
      <ExerciseField />

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please complete all fields before creating a training plan.
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Skeleton className="h-12 w-40" />
      ) : (
        <Button onClick={() => handleDownload()}>Create training plan</Button>
      )}
    </div>
  )
}
