import { useWeekStore } from "@/lib/store/weeks"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function WeekField() {
  const { weeks, setWeeks } = useWeekStore()

  return (
    <>
      <div className="mb-4">
        <Label className="text-lg">Training Program Duration</Label>
        <p className="text-sm text-muted-foreground">
          Select the number of weeks for this training program.
        </p>
      </div>
      <RadioGroup
        className="flex flex-col space-y-1"
        defaultValue={weeks}
        onValueChange={setWeeks}
      >
        <div className="flex items-center space-x-3 space-y-0">
          <RadioGroupItem id="4" value="4" />
          <Label htmlFor="4" className="font-normal">
            4 weeks
          </Label>
        </div>
        <div className="flex items-center space-x-3 space-y-0">
          <RadioGroupItem id="5" value="5" />
          <Label htmlFor="5" className="font-normal">
            5 weeks
          </Label>
        </div>
        <div className="flex items-center space-x-3 space-y-0">
          <RadioGroupItem id="6" value="6" />
          <Label htmlFor="6" className="font-normal">
            6 weeks
          </Label>
        </div>
      </RadioGroup>
    </>
  )
}
