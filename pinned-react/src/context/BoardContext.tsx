import React, { createContext, useContext, useState } from 'react'

import { getBoardFromLocalStorage } from "../lib/BoardHooks"
import { BoardContextType } from '@/lib/types';

type BoardContextProviderProps = {
  children: React.ReactNode
}

type BoardContextProviderType = {
  board: BoardContextType,
  setBoard: React.Dispatch<React.SetStateAction<BoardContextType>>
}

// context of the current board that will be use throughout the app
const BoardContext = createContext<BoardContextProviderType | null>(null);

export const BoardContextProvider = ({ children }: BoardContextProviderProps) => {
  const [board, setBoard] = useState<BoardContextType>(null); 
  
  return (
    // value contains the items available from the context
    <BoardContext.Provider value={{ board, setBoard }} >
      { children }
    </BoardContext.Provider>
  )
}

export function useBoardContext(id: string | undefined) {
  const context = useContext(BoardContext);
  
  // when context is used outside of context provider
  if (!context) {
    throw new Error("Board context must be used within BoardContextProvider");
  }

  // try and fetch the board from local storage
  if (!context.board) {
    context.board = getBoardFromLocalStorage(id? id : "");
  }

  return context;
}