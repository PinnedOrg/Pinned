"use client"

import React, { createContext, useContext, useState } from 'react'

// context that will be use throughout the app
const BoardContext = createContext(null);

export const BoardContextProvider = ({ children }) => {
    const [board, setBoard] = useState(null); 

  return (
    // value contains the information available from the context
    <BoardContext.Provider value={{board, setBoard}} >
        { children }
    </BoardContext.Provider>
  )
}


export function useBoardContext() {
  const context = useContext(BoardContext)

  if (!context) {
    throw new Error("Board context must be used within BoardContextProvider");
  }

  return context;
}