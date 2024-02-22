import { Skeleton } from "@/components/ui/skeleton"

export default function ExerciseSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-md border-2 border-muted w-fit p-2">
        <Skeleton className="h-[50px] w-[100px] rounded-xl" />
        <div className="space-y-2 ">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-[250px]" />
        </div>
      </div>
    </>
  )
}
