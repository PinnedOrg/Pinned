import React, { createContext, useState } from 'react'

// context that will be use throughout the app
const BoardContext = createContext(null);

const BoardContextProvider = ({ children }) => {
    const [board, setBoard] = useState(null); 

  return (
    // value contains the information available from the context
    <BoardContext.Provider value={{board, setBoard}} >
        { children }
    </BoardContext.Provider>
  )
}

export {BoardContext, BoardContextProvider};