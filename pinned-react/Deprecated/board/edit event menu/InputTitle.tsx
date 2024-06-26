
type InputTitleProps = {
  isRequired: boolean,
  children: React.ReactNode
}

const InputTitle = ({isRequired, children}: InputTitleProps) => {
  return (
    <span className='items-center'>
        <label htmlFor={String(children)} className='pl-2 text-sm'>
          {children}
        </label>
        {isRequired && <span className='text-red-500'> *</span>}
    </span>
  )
}

export default InputTitle;
