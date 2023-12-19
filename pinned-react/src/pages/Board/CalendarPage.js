import React from 'react'

import { useBoardContext } from '../../context/BoardContext';

const CalendarPage = () => {
  const { board, setBoard } = useBoardContext();

  return (
    <div>
      {board ? (
        <div>
          <h1>You are on the Calendar Page</h1>
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
