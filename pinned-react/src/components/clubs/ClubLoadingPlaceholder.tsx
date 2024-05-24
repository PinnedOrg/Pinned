import { Skeleton } from '../ui/skeleton'

const ClubLoadingPlaceholder = () => {
  return (
    <div className="flex flex-col space-y-3 h-[20rem] w-[25rem]">
        <Skeleton className="flex-grow w-full rounded-xl bg-slate-300" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-slate-300" />
            <Skeleton className="h-4 w-full bg-slate-300" />
            <Skeleton className="h-4 w-full bg-slate-300" />
            <Skeleton className="h-4 w-full bg-slate-300" />
        </div>
    </div>
  )
}

export default ClubLoadingPlaceholder
