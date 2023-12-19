import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

const LandingPage = () => {
  const [boards, setBoards] = useState(null);

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
         <div className="flex items-center w-screen pl-3 bg-gray-100 border-b border-black h-14 text-actionOrange">
            <h1 className="text-3xl font-bold">
                  <Link to="/">
                  Pinned
                  </Link>
            </h1>
         </div>

         {boards && <div className="flex gap-3 mt-5 ml-5">
            {boards.map((board, index) => (
               <Link to={`/board/${board._id}`}>
                  <div className="w-[24rem] h-[24rem] border border-actionOrange" key={index}>
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
                     <p className="mb-2">{board.createdAt}</p>
                     <p className="mb-2">{board.updatedAt}</p>
                  </div>   
               </Link>
            ))}
         </div>}
     </div>
  );
};

export default LandingPage;