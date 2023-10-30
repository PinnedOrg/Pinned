import React, { useState } from 'react'

import { HiPlus } from "react-icons/hi"
import { IoClose } from "react-icons/io5"

const SideMenu = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <section className="relative h-screen">
      {isSideMenuOpen &&  
      <div 
        className="absolute h-full w-[20rem] bg-none border-[0.13rem] border-actionOrange right-0 top-0 items-start justify-center text-gray-50">
        
        
        <button className=" text-[1.5rem] mt-1 ml-1 text-gray-500 hover:scale-[1.1] active:scale-105 transition hover:text-gray-800" onClick={() => setIsSideMenuOpen(false)}>
          <IoClose />
        </button>
        <h1 className='font-bold border w-full text-[1.6rem] text-center'>Add Elements</h1>
        
      </div>}

      {!isSideMenuOpen && <button className='fixed bottom-0 right-0 mr-10 mb-8 p-2 text-[2rem] rounded-full bg-actionOrange text-white hover:scale-105' onClick={() => setIsSideMenuOpen(true)}>
        <HiPlus />
      </button>}

    </section>
  )
}

export default SideMenu;
