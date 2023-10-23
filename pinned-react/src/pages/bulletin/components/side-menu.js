import './side-menu.css';

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';

import { HiPlus } from "react-icons/hi"

const SideMenu = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <div className='plus-button-container' onClick={()=> setIsSideMenuOpen(!isSideMenuOpen)}>
      {!isSideMenuOpen ?
         (<Button className='plus-button'>
         <span>
 
           <HiPlus />
         </span>
       </Button>) : (
        <nav className='side-menu'>

        </nav>
       )
      
      }
     
    </div>
  )
}

export default SideMenu;
