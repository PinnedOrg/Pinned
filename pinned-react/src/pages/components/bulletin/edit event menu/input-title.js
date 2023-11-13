import React from 'react'

const InputTitle = ({isRequired, ...props}) => {
  return (
    <span className='items-center'>
        <label htmlFor={String(props.children)} className='pl-2 text-sm'>{props.children}</label>
        {isRequired && <span className='text-red-500'> *</span>}
    </span>
  )
}

export default InputTitle;
