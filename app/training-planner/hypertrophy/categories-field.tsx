import { useCategoryStore } from "@/lib/store/categories"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CategoriesField() {
  const { categories, toggleCategory } = useCategoryStore()

  return (
    <>
      <div className="mb-4">
        <Label className="text-lg">Exercise Categories</Label>
        <p className="text-sm text-muted-foreground">
          Select categories based on your preferred exercises or available
          equipment.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {categories.map((item: any) => (
          <div
            className="flex flex-row items-start space-x-3 space-y-0"
            key={item.id}
          >
            <Checkbox
              id={item.id}
              checked={item.selected}
              onClick={() => {
                toggleCategory(item.id)
              }}
            />
            <Label htmlFor={item.id} className="font-normal">
              {item.label}
            </Label>
          </div>
        ))}
      </div>
    </>
  )
}
