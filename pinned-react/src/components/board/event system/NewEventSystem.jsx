import React, { useState, useEffect } from 'react'
import PlusButton from './PlusButton'
import EditEventMenu from '../edit event menu/EditEventMenu'

const NewEventSystem = () => {
  const [isEditEventMenuOpen, setIsEditEventMenuOpen] = useState(false)

  return (
    <div className="relative">
      {/*TODO: update to use react context instead of passing in set function as props*/}
      <PlusButton 
        isDisabled={isEditEventMenuOpen} 
        setIsEditEventMenuOpen={setIsEditEventMenuOpen}
        />
      
      {isEditEventMenuOpen && <EditEventMenu setIsEditEventMenuOpen={setIsEditEventMenuOpen} />}
    </div>
  )
}

export default NewEventSystem;

