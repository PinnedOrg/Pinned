import { IBoard } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";


const Directory = () => {
  const queryClient = useQueryClient();

  const FetchBoards = () => {
    return axios.get("http://localhost:8080/api/boards")
  }

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
      {data?.data.map((club: IBoard) => {
        return <h1>{club.name}</h1>
      })}
    </div>
  )
}

export default Directory;
