import React, { useState } from 'react'
import InputTitle from './input-title'

import { IoClose } from "react-icons/io5"
import { FileUpload } from 'primereact/fileupload'
import { Calendar } from 'primereact/calendar'

import { PrimeReactProvider } from 'primereact/api'
import { classNames } from 'primereact/utils'

//if usinng this while editing a coimponent, or gonig back to a draft, set the placeholder for all inputs the fetched data

//add tabmenu https://primereact.org/tabmenu/
//visible max character limit
//contact type?
//dynamic size div
//make it draggable around the screen?
//post only visible to certain people
// tags dropdown

const EditEventMenu = (props) => {

const TRANSITIONS = {
    overlay: {
        enterFromClass: 'opacity-0 scale-75',
        enterActiveClass: 'transition-transform transition-opacity duration-150 ease-in',
        leaveActiveClass: 'transition-opacity duration-150 ease-linear',
        leaveToClass: 'opacity-0'
    }
};

const CalendarTailwind = {
    calendar: {
        root: ({ props }) => ({
            className: classNames('inline-flex max-w-full relative', {
                'opacity-60 select-none pointer-events-none cursor-default': props.disabled
            })
        }),
        input: {
            // dark:text-white/80 dark:bg-gray-900 dark:border-blue-900/40
            root: ({ props }) => ({
                className: classNames('font-sans text-gray-600 bg-white transition-colors duration-200 appearance-none', 'hover:border-blue-500', {
                    'rounded-lg': !props.showIcon,
                    'border-r-0 rounded-l-lg': props.showIcon
                })
            })
        },
        dropdownbutton: ({ props }) => ({
            root: {
                className: classNames({ 'rounded-l-none': props.showIcon })
            }
        }),
        panel: ({ props }) => ({
            className: classNames('bg-white dark:bg-gray-900', 'min-w-[350px]', {
                'shadow-md border-0 absolute': !props.inline,
                'inline-block overflow-x-auto border border-gray-300 dark:border-blue-900/40 p-2 rounded-lg': props.inline
            })
        }),
        header: {
            className: classNames('flex items-center justify-between', 'p-2 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-semibold m-0 border-b border-gray-300 dark:border-blue-900/40 rounded-t-lg')
        },
        previousbutton: {
            className: classNames(
                'flex items-center justify-center cursor-pointer overflow-hidden relative',
                'w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out',
                'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 '
            )
        },
        title: 'leading-8 mx-auto',
        monthTitle: {
            className: classNames('text-gray-700 dark:text-white/80 transition duration-200 font-semibold p-2', 'mr-2', 'hover:text-blue-500')
        },
        yearTitle: {
            className: classNames('text-gray-700 dark:text-white/80 transition duration-200 font-semibold p-2', 'hover:text-blue-500')
        },
        nextbutton: {
            className: classNames(
                'flex items-center justify-center cursor-pointer overflow-hidden relative',
                'w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out',
                'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 '
            )
        },
        table: {
            className: classNames('border-collapse w-full', 'my-2')
        },
        tableheadercell: 'p-2',
        weekday: 'text-gray-600 dark:text-white/70',
        day: 'p-2',
        daylabel: ({ context }) => ({
            className: classNames(
                'w-10 h-10 rounded-full transition-shadow duration-200 border-transparent border',
                'flex items-center justify-center mx-auto overflow-hidden relative',
                'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                {
                    'opacity-60 cursor-default': context.disabled,
                    'cursor-pointer': !context.disabled
                },
                {
                    'text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.selected && !context.disabled,
                    'text-blue-700 bg-blue-100 hover:bg-blue-200': context.selected && !context.disabled
                }
            )
        }),
        monthpicker: 'my-2',
        month: ({ context }) => ({
            className: classNames(
                'w-1/3 inline-flex items-center justify-center cursor-pointer overflow-hidden relative',
                'p-2 transition-shadow duration-200 rounded-lg',
                'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                { 'text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.selected && !context.disabled, 'text-blue-700 bg-blue-100 hover:bg-blue-200': context.selected && !context.disabled }
            )
        }),
        yearpicker: {
            className: classNames('my-2')
        },
        year: ({ context }) => ({
            className: classNames(
                'w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative',
                'p-2 transition-shadow duration-200 rounded-lg',
                'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                {
                    'text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.selected && !context.disabled,
                    'text-blue-700 bg-blue-100 hover:bg-blue-200': context.selected && !context.disabled
                }
            )
        }),
        timepicker: {
            className: classNames('flex justify-center items-center', 'border-t-1 border-solid border-gray-300 p-2')
        },
        separatorcontainer: 'flex items-center flex-col px-2',
        separator: 'text-xl',
        hourpicker: 'flex items-center flex-col px-2',
        minutepicker: 'flex items-center flex-col px-2',
        ampmpicker: 'flex items-center flex-col px-2',
        incrementbutton: {
            className: classNames(
                'flex items-center justify-center cursor-pointer overflow-hidden relative',
                'w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out',
                'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 '
            )
        },
        decrementbutton: {
            className: classNames(
                'flex items-center justify-center cursor-pointer overflow-hidden relative',
                'w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out',
                'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 '
            )
        },
        groupcontainer: 'flex',
        group: {
            className: classNames('flex-1', 'border-l border-gray-300 pr-0.5 pl-0.5 pt-0 pb-0', 'first:pl-0 first:border-l-0')
        },
        transition: TRANSITIONS.overlay
    }
    }    
    const requiredSections = {
        "Title": true, //done
        "Description": true, //done
        "Preview Image": true,
        "Date": false, //done
        "Time": false, //done
        "Tags": true, //done
        "Location": false, //done
        "Upload": false,
        "Contact Info": false //done
    }

    const [date, setDate] = useState(null);

    const closeMenu = () => {
        props.setIsEditEventMenuOpen(false);
    }

  return (
    <div className='flex fixed left-0 top-0 bg-black/[0.55] h-screen w-screen justify-center'> 
        <div className='relative w-[37rem] flex flex-col border border-black bg-gray-50 rounded-xl my-2 mx-4'>
            <button 
                className="absolute text-[1.5rem] top-2 left-2 text-gray-500 dark:ext-white hover:scale-[1.1] active:scale-105 transition hover:text-gray-800 dark:over:text-gray-200" 
                onClick={() => closeMenu()}
            >
                <IoClose />
            </button>

            <h1 className='font-bold w-full mt-5 text-[1.6rem] text-center'>
                Create New Event
            </h1>

            <form className='flex flex-col h-full px-5 mt-8 text-sm'>
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

                <InputTitle isRequired={requiredSections["Description"]}>
                    Description
                </InputTitle>
                <textarea 
                    id='Description'
                    className='h-[7rem] rounded-[0.55rem] borderBlack70 pl-3 pt-1 w-full mb-3 resize-none'
                    type='text'
                    name='eventDescription'
                    required={requiredSections["Description"]}  
                    maxLength={2000}
                />

                <div className='flex flex-row justify-between w-full gap-6 mb-3'>
                    <div className='flex flex-col w-full'>
                        <InputTitle isRequired={requiredSections["Contact Info"]}>
                            Contact Info
                        </InputTitle>
                        <textarea 
                            id='Contact Info'
                            className='rounded-[0.55rem] borderBlack70 pl-3 pt-1 h-full mb-3 resize-none'
                            type='text'
                            name='eventContact'
                            required={requiredSections["Contact Info"]} 
                            maxLength={2000}
                        />

                        <InputTitle isRequired={requiredSections["Tags"]} >
                            Tags
                        </InputTitle>
                        <textarea 
                            id='Tags'
                            className='rounded-[0.55rem] borderBlack70 pl-3 pt-1 h-full resize-none'
                            type='text'
                            name='eventTags'
                            required={requiredSections["Tags"]} 
                            maxLength={2000}
                        />
                    </div>
                    <div className='max-w-[45%]'>
                        <InputTitle isRequired={requiredSections["Date"]}>
                            Date
                        </InputTitle>
                        <input 
                            id="Date"
                            className='h-8 rounded-[0.55rem] borderBlack70 pl-3 w-full mb-2 pr-2'
                            type='date'
                            name='eventDate'
                            required={requiredSections["Date"]}
                            maxLength={500}
                            
                        />

                            {/*<PrimeReactProvider value={{ unstyled: true, pt: Tailwind }} >
                                <Calendar 
                                    className='border rounded-[0.55rem] borderBlack70 pl-3 w-full mb-2 pr-2'
                                    id='Date'
                                    value={date} 
                                    onChange={(e) => setDate(e.value)} 
                                    required={requiredSections["Date"]}
                                    defaultValue={"mm/dd/yyyy"}
                                />
                            </PrimeReactProvider>*/}
                        

                        <InputTitle isRequired={requiredSections["Time"]}>
                            Time
                        </InputTitle>
                        <input 
                            id="Time"
                            className='h-8 rounded-[0.55rem] borderBlack70 pl-3 w-full pr-2 mb-3'
                            type='time'
                            name='eventTime'
                            required={requiredSections["Time"]}
                            maxLength={500}
                        /> 

                        <InputTitle isRequired={requiredSections["Location"]}>
                            Location
                        </InputTitle>
                        <input 
                            id="Location"
                            className='h-8 rounded-[0.55rem] borderBlack70 pl-3 w-full pr-2'
                            type='text'
                            name='eventLocation'
                            required={requiredSections["Location"]}
                            maxLength={500}
                        />     
                    </div>
                </div>

                <div className='flex flex-col '>
                    <InputTitle isRequired={requiredSections["Preview Image"]}>
                        Preview Image
                    </InputTitle>
                </div>

                <div className='absolute flex items-center gap-2 font-medium bottom-4 left-4'>
                    <input type='checkbox'  defaultChecked={true}/>
                    <p>Add to Calender</p>
                </div>


                <button 
                    type='submit' 
                    disabled={false}
                    className='absolute bottom-3 right-3 gap-2 text-xs sm:text-sm font-bold items-center justify-center h-[1.8rem] sm:h-[2rem] w-[4rem] sm:w-[4.5rem] bg-gray-900 text-white rounded-full outline-none transition-all hover:bg-gray-950 hover:scale-[1.07] active:scale-[1.03] disabled:scale-100 disabled:bg-opacity-65'
                    onClick={() => {}}
                >
                    Create
                </button>
            </form>
        </div>
          
    </div>
  )
}

export default EditEventMenu;
