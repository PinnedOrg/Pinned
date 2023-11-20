import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const BoardHome = () => {
  return (
    <div className='flex gap-3'>
        <Link to={"general"}>General Page</Link>
        <Link to={"events"}>Events Page</Link>
        <Link to={"calendar"}>Calendar</Link>

        <Outlet />
        
    </div>
  )
}

export default BoardHome
