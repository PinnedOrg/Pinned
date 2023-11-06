import React from 'react'
import useForm  from 'react-dom'

const SubmitButton = () => {

  return (
    <button 
        type='submit' 
        disabled={false}
        className='absolute bottom-4 right-3 gap-2 text-sm font-semibold items-center justify-center h-[2rem] w-[4.5rem] bg-gray-900 text-white rounded-full outline-none transition-all hover:bg-gray-950 hover:scale-[1.07] active:scale-[1.03] disabled:scale-100 disabled:bg-opacity-65'
    >
        Create
        
    </button>
  )
}

export default SubmitButton;