import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'


const BoardHome = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    // fetch board object from backend 
    axios.get(`http://localhost:8080/api/boards/${id}`)
      .then((response) => {
        setBoard(response.data);
      })
      .catch((e) => {
        setError(e.message);
      })
  
  }, [id])


  // will need to use context to pass board object to remainng links
  return (
      <div>
        {board && (
          <div className='flex gap-3 text-blue-500 underline'>
              <Link to={"general"}>General Page</Link>
              <Link to={"events"}>Events Page</Link>
              <Link to={"calendar"}>Calendar</Link>        
          </div>
        )}
        {error && (
          <div>
            <h1>{error}</h1>
          </div>
        )}
      </div>
  )
}

export default BoardHome;
