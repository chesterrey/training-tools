"use client"

import { useEffect, useState } from "react"

import { Separator } from "@/components/ui/separator"
import Calculator from "@/app/calorie-calculator/calculator"
import Result from "@/app/calorie-calculator/result"

export default function CalorieCalculator() {
  const [caloricValues, setCaloricValues] = useState({
    maintenance: 0,
    deficit: [],
    surplus: [],
  } as {
    maintenance: number
    deficit: number[]
    surplus: number[]
  })

  const handleCalculate = (amr: number, weightInKg: number) => {
    const deficit = [
      amr - weightInKg * 0.005 * 1000,
      amr - weightInKg * 0.0075 * 1000,
      amr - weightInKg * 0.01 * 1000,
    ]

    const surplus = [
      amr + weightInKg * 0.005 * 1000,
      amr + weightInKg * 0.0075 * 1000,
      amr + weightInKg * 0.01 * 1000,
    ]

    setCaloricValues({
      maintenance: amr,
      deficit,
      surplus,
    })
  }

  return (
    <>
      <div className="lg:ml-48 lg:w-1/2 flex flex-col gap-8">
        <Calculator handleCalculate={handleCalculate} />
        {caloricValues.maintenance > 0 && (
          <>
            <Separator />
            <Result caloricValues={caloricValues} />
          </>
        )}
      </div>
    </>
  )
}
