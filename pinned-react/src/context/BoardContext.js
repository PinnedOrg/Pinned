import React, { createContext, useContext, useState } from 'react'

import { getBoardFromLocalStorage } from "../hooks/BoardHooks"

// context of the current board that will be use throughout the app
const BoardContext = createContext(null);

export const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState(null); 
  
  return (
    // value contains the items available from the context
    <BoardContext.Provider value={{board, setBoard}} >
      { children }
    </BoardContext.Provider>
  )
}

export function useBoardContext(id) {
  const context = useContext(BoardContext);
  
  // when context is used outside of context provider
  if (!context) {
    throw new Error("Board context must be used within BoardContextProvider");
  }

  // try and fetch the board from local storage
  if (!context.board) {
    context.board = getBoardFromLocalStorage(id);
  }

  return context;
}