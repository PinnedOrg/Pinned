import React from 'react'

import InputTitle from './InputTitle';

const InputSection = ({name, type, maxLength}) => {
  return (
    <div>
        <InputTitle isRequired={requiredSections["Title"]}>
            Title
        </InputTitle>
        <input 
            id="Title"
            className='h-8 rounded-[0.55rem] borderBlack70 pl-3 w-full mb-3'
            type='text'
            name='eventTitle'
            required={requiredSections["Title"]}
            maxLength={500}
            defaultValue={"Hello"}
        />
    </div>
  )
}

export default InputSection;
