import React, { useState } from 'react'

import { HiPlus } from "react-icons/hi"

const SideMenu = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <div className='' onClick={()=> setIsSideMenuOpen(!isSideMenuOpen)}>
      
     
    </div>
  )
}

export default SideMenu;
