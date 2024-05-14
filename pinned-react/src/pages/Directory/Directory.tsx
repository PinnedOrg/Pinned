import { IClub } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type FiltersType = {
  genre: string,
  isActive: boolean,
  size: number,
  cost: number
}

const FetchBoards = () => {
  return axios.get("http://localhost:8080/api/boards")
}

const Directory = () => {
  //const queryClient = useQueryClient();

  // fetch boards from database
  const {isPending, isError, data, error } = useQuery({
    queryKey: ["Boards"],
    queryFn: FetchBoards
  })

  if (isPending) {
    return ( <h1>Loading...</h1>)
  }  
  if (isError) {
    return ( <h1>{error.message}</h1>)
  }

  return (
    <div>
      {data?.data.map((club: IClub) => {
        return (
          <div>
            <h1>{club.name}</h1>
            <p>{club.overview}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Directory;
