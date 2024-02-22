import { useEffect, useState } from "react"
import getRoutines from "@/firebase/firestore/getRoutines"

import { useRoutineStore } from "@/lib/store/routine"
import { useRoutineCollectionStore } from "@/lib/store/routineCollection"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import RoutineSkeleton from "../components/routine-skeleton"

const splits = [
  {
    id: 2,
    label: "2-Day",
  },
  {
    id: 3,
    label: "3-Day",
  },
  {
    id: 4,
    label: "4-Day",
  },
  {
    id: 5,
    label: "5-Day",
  },
  {
    id: 6,
    label: "6-Day",
  },
] as const

export default function RoutineField() {
  const { routine, setRoutine } = useRoutineStore()
  const { routineCollection, setRoutineCollection } =
    useRoutineCollectionStore()
  const [loading, setLoading] = useState(true)

  const [filteredRoutines, setFilteredRoutines] = useState([])
  const [selectedSplit, setSelectedSplit] = useState(2)

  useEffect(() => {
    setLoading(true)
    getRoutines().then((routines: any) => {
      setRoutineCollection(routines.result)
    })
  }, [])

  useEffect(() => {
    if (routineCollection.length > 0) {
      setLoading(false)
    }
  }, [routineCollection])

  useEffect(() => {
    const filtered = routineCollection.filter(
      (rtn: any) => rtn.split === selectedSplit
    )
    setFilteredRoutines(filtered)
  }, [selectedSplit, routineCollection])

  return (
    <>
      <div className="mb-4">
        <Label className="text-lg">Routine Splits</Label>
        <p className="text-sm text-muted-foreground">
          Select the routine split that best fits your schedule and preferences.
        </p>
      </div>
      <div className="bg-background">
        <div className="h-full">
          <Tabs defaultValue="2" className="h-full space-y-6">
            <div className="space-between flex items-center">
              <TabsList>
                {splits.map((split) => (
                  <TabsTrigger
                    key={split.id}
                    value={split.id.toString()}
                    onClick={() => {
                      setSelectedSplit(split.id)
                    }}
                  >
                    {split.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <Separator className="my-4" />
            {loading ? (
              <RoutineSkeleton />
            ) : (
              splits.map((split) => {
                return (
                  <TabsContent
                    value={split.id.toString()}
                    className="border-none p-0 outline-none"
                    key={split.id}
                  >
                    <div className="space-y-1">
                      <RadioGroup
                        className="grid grid-cols-3 gap-8 pt-2"
                        value={routine.id}
                        onValueChange={(id) => {
                          const selectedRoutine = routineCollection.find(
                            (rtn: any) => rtn.id === id
                          )

                          if (selectedRoutine) {
                            setRoutine(selectedRoutine)
                          }
                        }}
                      >
                        {filteredRoutines.map((rtn: any) => {
                          return (
                            <Label
                              className="[&:has([data-state=checked])>div]:border-primary"
                              key={rtn.id}
                            >
                              <RadioGroupItem
                                value={rtn.id}
                                className="sr-only"
                              />
                              <div className="h-40 items-center rounded-md border-2 border-muted p-1 hover:border-accent flex">
                                <span className="block w-full p-2 text-center font-normal my-auto">
                                  {rtn.label}
                                </span>
                              </div>
                            </Label>
                          )
                        })}
                      </RadioGroup>
                    </div>
                  </TabsContent>
                )
              })
            )}
          </Tabs>
        </div>
      </div>
    </>
  )
}
