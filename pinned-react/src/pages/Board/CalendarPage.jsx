import React from 'react'

import { useBoardContext } from '../../context/BoardContext';
import { useParams } from 'react-router-dom';

const CalendarPage = () => {
  const { id } = useParams()
  const { board, setBoard } = useBoardContext(id);

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
