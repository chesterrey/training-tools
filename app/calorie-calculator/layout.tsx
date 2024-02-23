"use client"

import { Separator } from "@/components/ui/separator"

interface CalorieCalculatorLayoutProps {
  children: React.ReactNode
}

export default function CalorieCalculatorLayout({
  children,
}: CalorieCalculatorLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Calorie Calculator
          </h2>
          <p className="text-muted-foreground">
            Calculate the daily calorie intake required for an individual.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
