import React from 'react'

import { useBoardContext } from '../../context/BoardContext'

const GeneralPage = () => {
  const { board, setBoard } = useBoardContext();

  return (
    <div>
      {board ? (
        <div>
          <h1>General Page for <span className='font-bold'>{board.name}</span> </h1>
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
