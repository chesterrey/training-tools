import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TabItems = [
  {
    value: "deficit",
    label: "Deficit",
  },
  {
    value: "surplus",
    label: "Surplus",
  },
] as const

export default function Result({ caloricValues }: { caloricValues: any }) {
  return (
    <>
      <div className="p-8 border rounded-lg flex flex-col gap-4">
        <Label className="text-lg">Results</Label>
        <Tabs defaultValue="deficit" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              {TabItems.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <Separator className="my-4" />
          <TabsContent value="deficit" className="border-none p-0 outline-none">
            <div className="space-y-1 w-[300px] flex flex-col gap-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maintenance Calories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {caloricValues.maintenance.toFixed()} kcal / day
                  </div>
                  <p className="text-xs text-muted-foreground">
                    maintain current bodyweight
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Mild calorie deficit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {caloricValues.deficit[0]?.toFixed()} kcal / day
                  </div>
                  <p className="text-xs text-muted-foreground">
                    -0.5% bodyweight per week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Moderate calorie deficit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {caloricValues.deficit[1]?.toFixed()} kcal / day
                  </div>
                  <p className="text-xs text-muted-foreground">
                    -0.75% bodyweight per week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Aggressive calorie deficit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {caloricValues.deficit[2]?.toFixed()} kcal / day
                  </div>
                  <p className="text-xs text-muted-foreground">
                    -0.1% bodyweight per week
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="surplus" className="border-none p-0 outline-none">
            <div className="space-y-1 w-[300px] flex flex-col gap-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maintenance Calories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {caloricValues.maintenance.toFixed()} kcal / day
                  </div>
                  <p className="text-xs text-muted-foreground">
                    maintain current bodyweight
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Mild calorie surplus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {caloricValues.surplus[0]?.toFixed()} kcal / day
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +0.5% bodyweight per week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Moderate calorie surplus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {caloricValues.surplus[1]?.toFixed()} kcal / day
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +0.75% bodyweight per week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Aggressive calorie surplus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {caloricValues.surplus[2]?.toFixed()} kcal / day
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +0.1% bodyweight per week
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
