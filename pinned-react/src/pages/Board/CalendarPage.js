import React from 'react'

import { useBoardContext } from '../../context/BoardContext';

const CalendarPage = () => {
  const { board, setBoard } = useBoardContext();

  return (
    <div>
      {board ? (
        <div>
          <h1>Calendar Page for <span className='font-bold'>{board.name}</span> </h1>
        </div>
      ) : (
        <div>
          <h1>Board not found.</h1>
        </div>
      )}
    </div>
  )
}

export default CalendarPage;
