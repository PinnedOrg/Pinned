import React from 'react'
import { Link } from 'react-router-dom'

const BoardHome = () => {
  const boardRoute = 123874612 // will be fetched from backend

  return (
    <div className='flex gap-3'>
      <Link to={`/board/:${boardRoute}/general`}>General Page</Link>
      <Link to={`/board/:${boardRoute}/events`}>Events Page</Link>
      <Link to={`/board/:${boardRoute}/calendar`}>Calendar</Link>
    </div>
  )
}

export default BoardHome
