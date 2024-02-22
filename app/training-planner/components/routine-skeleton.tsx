import { Skeleton } from "@/components/ui/skeleton"

export default function RoutineSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8 pt-2">
      <div className="h-40 items-center rounded-md border-2 border-muted p-1 flex flex-col gap-2">
        <Skeleton className="h-2 w-24 mt-auto" />
        <Skeleton className="h-2 w-24 mb-auto" />
      </div>
      <div className="h-40 items-center rounded-md border-2 border-muted p-1 flex flex-col gap-2">
        <Skeleton className="h-2 w-24 mt-auto" />
        <Skeleton className="h-2 w-24 mb-auto" />
      </div>
      <div className="h-40 items-center rounded-md border-2 border-muted p-1 flex flex-col gap-2">
        <Skeleton className="h-2 w-24 mt-auto" />
        <Skeleton className="h-2 w-24 mb-auto" />
      </div>
    </div>
  )
}
