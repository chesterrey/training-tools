"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function Calculator({
  handleCalculate,
}: {
  handleCalculate: (amr: number, weightInKg: number) => void
}) {
  const [age, setAge] = useState("")
  const [heightUnit, setHeightUnit] = useState("cm")
  const [weightUnit, setWeightUnit] = useState("kg")

  const [height, setHeight] = useState({
    cm: "",
    ft: "",
    in: "",
  })

  const [weight, setWeight] = useState({
    kg: "",
    lbs: "",
  })

  const [gender, setGender] = useState("male")

  const [errors, setErrors] = useState({
    age: "",
    height: "",
    weight: "",
    calc: "",
  })

  const [activity, setActivity] = useState("sedentary")

  const computeBMR = () => {
    const weightInKg =
      weightUnit === "kg"
        ? parseInt(weight.kg)
        : parseInt(weight.lbs) * 0.453592
    const heightInCm =
      heightUnit === "cm"
        ? parseInt(height.cm)
        : parseInt(height.ft) * 30.48 + parseInt(height.in) * 2.54

    if (gender === "female") {
      return (
        655.1 + 9.563 * weightInKg + 1.85 * heightInCm - 4.676 * parseInt(age)
      )
    }
    return (
      66.47 + 13.75 * weightInKg + 5.003 * heightInCm - 6.755 * parseInt(age)
    )
  }

  const computeAMR = () => {
    const BMR = computeBMR()
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
      "extra-active": 2.2,
    } as any
    return BMR * activityMultipliers[activity]
  }

  useEffect(() => {
    const ageRegex = /^[1-9][0-9]?$|^80$/

    if (age === "") {
      setErrors((prev) => ({ ...prev, age: "" }))
    } else if (!ageRegex.test(age)) {
      setErrors((prev) => ({
        ...prev,
        age: "Age must be a number between 15 and 80",
      }))
    } else {
      setErrors((prev) => ({ ...prev, age: "" }))
    }
  }, [age])

  useEffect(() => {
    if (heightUnit === "cm") {
      setHeight({ cm: "", ft: "", in: "" })
    } else {
      setHeight({ cm: "", ft: "", in: "" })
    }
  }, [heightUnit])

  useEffect(() => {
    if (weightUnit === "kg") {
      setWeight({ kg: "", lbs: "" })
    } else {
      setWeight({ kg: "", lbs: "" })
    }
  }, [weightUnit])

  useEffect(() => {
    const heightRegexCm = /^[1-2]?[0-9]?[0-9]$/
    const heightRegexFt = /^[1-7]$/
    const heightRegexIn = /^[1-9]$|^1[0-1]$/

    if (heightUnit === "cm") {
      if (height.cm === "") {
        setErrors((prev) => ({ ...prev, height: "" }))
      } else if (!heightRegexCm.test(height.cm)) {
        setErrors((prev) => ({
          ...prev,
          height: "Height must be a number between 100 and 299",
        }))
      } else {
        setErrors((prev) => ({ ...prev, height: "" }))
      }
    } else {
      if (height.ft === "" || height.in === "") {
        setErrors((prev) => ({ ...prev, height: "" }))
      } else if (
        !heightRegexFt.test(height.ft) ||
        !heightRegexIn.test(height.in)
      ) {
        setErrors((prev) => ({
          ...prev,
          height:
            "Height must be a number between 1 and 7 for ft and 1 and 11 for in",
        }))
      } else {
        setErrors((prev) => ({ ...prev, height: "" }))
      }
    }
  }, [height])

  useEffect(() => {
    const weightRegexKg = /^[1-9]?[0-9]$|^1[0-9][0-9]$/
    const weightRegexLbs = /^[1-9]?[0-9]$|^1[0-9][0-9]$|^2[0-4][0-9]$|^250$/

    if (weightUnit === "kg") {
      if (weight.kg === "") {
        setErrors((prev) => ({ ...prev, weight: "" }))
      } else if (!weightRegexKg.test(weight.kg)) {
        setErrors((prev) => ({
          ...prev,
          weight: "Weight must be a number between 10 and 250",
        }))
      } else {
        setErrors((prev) => ({ ...prev, weight: "" }))
      }
    } else {
      if (weight.lbs === "") {
        setErrors((prev) => ({ ...prev, weight: "" }))
      } else if (!weightRegexLbs.test(weight.lbs)) {
        setErrors((prev) => ({
          ...prev,
          weight: "Weight must be a number between 10 and 250",
        }))
      } else {
        setErrors((prev) => ({ ...prev, weight: "" }))
      }
    }
  }, [weight])

  return (
    <>
      <div className="p-8 flex flex-col gap-8 rounded-lg border ">
        <div className="flex items-center gap-4">
          <Label className="min-w-20">Age</Label>
          <Input
            className="w-40"
            placeholder="15 - 80"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-20">Gender</Label>
          <RadioGroup
            defaultValue="male"
            onValueChange={(value) => setGender(value)}
            value={gender}
            className="flex items-center gap-8"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem id="male" value="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="female" value="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-20">Height</Label>
          {heightUnit === "cm" ? (
            <Input
              className="w-40"
              placeholder="160"
              value={height.cm}
              onChange={(e) => setHeight({ ...height, cm: e.target.value })}
            />
          ) : (
            <div className="flex">
              <Input
                className="w-20"
                placeholder="5"
                value={height.ft}
                onChange={(e) => setHeight({ ...height, ft: e.target.value })}
              />
              <Input
                className="w-20"
                placeholder="3"
                value={height.in}
                onChange={(e) => setHeight({ ...height, in: e.target.value })}
              />
            </div>
          )}
          <ToggleGroup
            type="single"
            value={heightUnit}
            onValueChange={(value) => setHeightUnit(value)}
          >
            <ToggleGroupItem value="cm" aria-label="Toggle cm">
              cm
            </ToggleGroupItem>
            <ToggleGroupItem value="ft" aria-label="Toggle ft">
              ft
            </ToggleGroupItem>
          </ToggleGroup>
          {errors.height && (
            <p className="text-sm text-red-500">{errors.height}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-20">Weight</Label>
          <Input
            className="w-40"
            placeholder={weightUnit === "kg" ? "60" : "130"}
            value={weightUnit === "kg" ? weight.kg : weight.lbs}
            onChange={(e) =>
              setWeight({
                kg: weightUnit === "kg" ? e.target.value : "",
                lbs: weightUnit === "lbs" ? e.target.value : "",
              })
            }
          />
          <ToggleGroup
            type="single"
            value={weightUnit}
            onValueChange={(value) => setWeightUnit(value)}
          >
            <ToggleGroupItem value="kg" aria-label="Toggle kg">
              kg
            </ToggleGroupItem>
            <ToggleGroupItem value="lbs" aria-label="Toggle lbs">
              lbs
            </ToggleGroupItem>
          </ToggleGroup>
          {errors.weight && (
            <p className="text-sm text-red-500">{errors.weight}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-20">Activity</Label>
          <Select
            defaultValue="sedentary"
            value={activity}
            onValueChange={(value) => setActivity(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="sedentary">
                  Sedentary: little or no exercise
                </SelectItem>
                <SelectItem value="light">
                  Light: exercise 1-3 times/week
                </SelectItem>
                <SelectItem value="moderate">
                  Moderate: exercise 4-5 times/week
                </SelectItem>
                <SelectItem value="active">
                  Active: daily or intense exercise 3-4 times/week
                </SelectItem>
                <SelectItem value="very-active">
                  Very Active: intense exercise 6-7 times/week
                </SelectItem>
                <SelectItem value="extra-active">
                  Extra Active: very intense exercise daily, or physical job
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              if (
                errors.age ||
                errors.height ||
                errors.weight ||
                age === "" ||
                (heightUnit === "cm" && height.cm === "") ||
                (heightUnit === "ft" &&
                  (height.ft === "" || height.in === "")) ||
                (weightUnit === "kg" && weight.kg === "") ||
                (weightUnit === "lbs" && weight.lbs === "")
              ) {
                setErrors((prev) => ({
                  ...prev,
                  calc: "Please fill in all the fields",
                }))
                return
              }
              handleCalculate(
                computeAMR(),
                weightUnit === "kg"
                  ? parseInt(weight.kg)
                  : parseInt(weight.lbs) * 0.453592
              )
              setErrors((prev) => ({ ...prev, calc: "" }))
            }}
          >
            Calculate
          </Button>
          {errors.calc && <p className="text-sm text-red-500">{errors.calc}</p>}
        </div>
      </div>
    </>
  )
}
