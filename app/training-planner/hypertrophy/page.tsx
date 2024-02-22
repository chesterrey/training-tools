"use client"

import { Separator } from "@/components/ui/separator"
import { HypertrophyForm } from "@/app/training-planner/hypertrophy/hypertrophy-form"

export default function HypertrophyPlanner() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Hypertrophy Planner
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Create a custom hypertrophy training plan based on your preferences
          and goals.
        </p>
      </div>
      <div className="space-y-6">
        <Separator />
        <HypertrophyForm />
      </div>
    </section>
  )
}
