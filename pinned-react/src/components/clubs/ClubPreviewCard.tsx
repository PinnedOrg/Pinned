import { IClub } from '@/lib/types'

type ClubPreviewCardProps = {
  club: IClub
}


const ClubPreviewCard = ({ club }: ClubPreviewCardProps) => {
  return (
    <div className="w-[30%] bg-white p-4 rounded-md shadow-md">
      <h1 className='text-black'>{club.name}</h1>
      <p>{club.genre}</p>
      <p>{club.cost}</p>
      <p>{club.size}</p>
    </div>
  )
}

export default ClubPreviewCard
