"use client"

import React from 'react'

import { useBoardContext } from '../../context/BoardContext'

const GeneralPage = () => {
  const { board, setBoard } = useBoardContext();

  return (
    <div>
      {board ? (
        <div>
          <h1>You are on the General Page</h1>
        </div>
      ) : (
        <div>
          <h1>Board not found.</h1>
        </div>
      )}
    </div>
    
  )
}

export default GeneralPage
