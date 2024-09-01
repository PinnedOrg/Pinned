import { Card, CardHeader, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const ClubLoadingPlaceholder = () => {
  return (
    <Card className='border-none h-[20rem] w-[17rem] bg-transparent'>
      <CardHeader className='h-2/3'>
        <Skeleton className="h-full bg-muted" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 bg-muted" />
        <Skeleton className="h-4 bg-muted" />
        <Skeleton className="h-4 bg-muted" />
        <Skeleton className="h-4 bg-muted" />
      </CardContent>
    </Card>
  )
}

export default ClubLoadingPlaceholder
