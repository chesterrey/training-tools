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

export default function CalorieCalculator() {
  const [age, setAge] = useState("")
  const [heightUnit, setHeightUnit] = useState("cm")
  const [weightUnit, setWeightUnit] = useState("kg")

  const [gender, setGender] = useState("male")

  const [errors, setErrors] = useState({
    age: "",
  })

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

  return (
    <>
      <div className="lg:ml-48 p-8 flex flex-col gap-8 rounded-lg border lg:w-1/2">
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
            <Input className="w-40" placeholder="160" />
          ) : (
            <div className="flex">
              <Input className="w-20" placeholder="5" />
              <Input className="w-20" placeholder="3" />
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
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-20">Weight</Label>
          <Input
            className="w-40"
            placeholder={weightUnit === "kg" ? "60" : "130"}
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
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-20">Activity</Label>
          <Select defaultValue={"sedentary"}>
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
          <Button>Calculate</Button>
          <Button variant={"outline"}>Clear</Button>
        </div>
      </div>
    </>
  )
}
