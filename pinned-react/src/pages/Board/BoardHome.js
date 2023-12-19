"use client"

import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useBoardContext } from "../../context/BoardContext"

const BoardHome = () => {
  const { id } = useParams();
  const { board, setBoard } = useBoardContext();

  useEffect(() => {

    // fetch board object from backend 
    axios.get(`http://localhost:8080/api/boards/${id}`)
      .then((response) => {
        setBoard(response.data);
      })
      .catch((e) => {
        setBoard(null);
      })
  
  }, [id])


  // will need to use context to pass board object to remainng links
  return (
      <div>
        {board ? (
          <div>
            <h1 className='text-center border w-full border-black bg-actionOrange h-[3rem]'>
              Temp Heading
            </h1>
            <div className='flex gap-3 text-blue-500 underline'>
                <Link to={"general"}>General Page</Link>
                <Link to={"events"}>Events Page</Link>
                <Link to={"calendar"}>Calendar</Link>        
            </div>
          </div>
        ) : (
          <div>
            <h1>Board not found.</h1>
          </div>
        )}
      </div>
  )
}

export default BoardHome;
