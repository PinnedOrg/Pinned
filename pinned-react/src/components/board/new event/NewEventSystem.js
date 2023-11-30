import React, { useState } from 'react'
import PlusButton from './PlusButton'
import EditEventMenu from '../edit event menu/EditEventMenu'

const NewEventSystem = () => {
  const [isEditEventMenuOpen, setIsEditEventMenuOpen] = useState(false)

  return (
    <div className="relative">
      <PlusButton 
        isDisabled={isEditEventMenuOpen} 
        setIsEditEventMenuOpen={setIsEditEventMenuOpen}
        />
      
      {isEditEventMenuOpen && <EditEventMenu setIsEditEventMenuOpen={setIsEditEventMenuOpen} />}
    </div>
  )
}

export default NewEventSystem;

