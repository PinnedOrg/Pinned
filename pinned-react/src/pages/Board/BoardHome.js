"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useBoardContext } from "../../context/BoardContext"
import { setBoardToLocalStorage } from '../../hooks/BoardHooks';

const BoardHome = () => {
  const { id } = useParams();
  const { board, setBoard } = useBoardContext(id);

  useEffect(() => {

    // fetch board object from backend
    if (!board) {
      console.log("no board in storage");
      axios.get(`http://localhost:8080/api/boards/${id}`)
        .then((response) => {
          setBoard(response.data)
          setBoardToLocalStorage(response.data);
        })
        .catch(() => {
          setBoard(null);
        })
    }

  }, [id])

  return (
      <div>
        {board ? (
          <div>
            <Link to={'/'} className=''>Home</Link>
            <h1 className='text-center border w-full border-black bg-actionOrange h-[3rem] relative'>
              {board.name}
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
