import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { BoardInterface } from "@/lib/types";
import { UserButton } from "@clerk/clerk-react";

const Dashboard = () => {
  const [boards, setBoards] = useState<Array<BoardInterface>>([]);

  useEffect(() => {
   axios.get("http://localhost:8080/api/boards/previews")
    .then((allBoards) => {
       console.log(`GOT ${allBoards.data.length} boards`)
       setBoards(allBoards.data);
    })
    .catch((error) => {
       console.log(error.message)
    })
  }, [])

  return (
     <div>
        <UserButton showName={true} afterSignOutUrl="/" />
         {boards.length > 0 && <div className="flex gap-3 mt-5 ml-5">
            {boards.map((board, index) => (
               <Link to={`/board/${board._id}`} key={index}>
                  <div className="w-[24rem] h-[24rem] border border-primary" >
                     <h1 className="mb-2">{board.name}</h1>
                     <p className="mb-2">{board.about}</p>
                     <h2 className="mb-2">{"Owner: " + board.owner}</h2>
                     {/* {board.admins &&  <ul className="mb-2">
                        {board.admins.map((name, i) => (
                           <li key={i}>{name}</li>
                        ))}
                     </ul> } */}
                     {/* {board.subscribers &&  <ul className="mb-2">
                        {board.subscribers.map((name, i) => (
                           <li key={i}>{name}</li>
                        ))}
                     </ul> } */}
                     <p className="mb-2">{board.location}</p>
                     <p className="mb-2">{board.createdAt.toLocaleString()}</p>
                     <p className="mb-2">{board.updatedAt.toLocaleString()}</p>
                  </div>   
               </Link>
            ))}
         </div>}
     </div>
  );
};

export default Dashboard;