import React, {useState} from 'react'
import InputTitle from './input-title'
import axios from 'axios'
import { IoClose } from "react-icons/io5"
import { useBoardDataEffect } from '../../../pages/Board/EventsPage'
import { useParams } from 'react-router-dom'
//if usinng this while editing a coimponent, or gonig back to a draft, set the placeholder for all inputs the fetched data

//visible max character limit
//contact type?
//dynamic size div
//make it draggable around the screen?

const EditEventMenu = (props) => {
    const { id } = useParams()

    const [formData, setFormData] = useState({
        eventTitle: "Hello",
        eventDescription: "",
        eventContact: "",
        eventTags: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        eventPreview: null,
    });

    const requiredSections = {
        "Title": true, //done
        "Description": true, //done
        "Preview Image": false,
        "Date": false, //done
        "Time": false, //done
        "Tags": false, //done
        "Location": false, //done
        "Upload": false,
        "Contact Info": false //done
    }

    const closeMenu = () => {
        props.setIsEditEventMenuOpen(false)
    }

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        //TODO: Logic for connecting and put into DB
        e.preventDefault();

        const {
            eventTitle,
            eventDescription,
            eventContact,
            eventTags,
            eventDate,
            eventTime,
            eventLocation,
            eventPreview,
        } = formData;

        try {
            const response = await axios.post('http://localhost:8080/api/events', 
            {    
                "title": eventTitle,
                "description": eventDescription,
                "tags": ["temp tag1", "temp tag2"],
                "belongsToBoard": id
            });
            console.log('Board data set successfully:', response);
        } catch (error) {
            console.error('Error setting board data:', error);
        }
              
        // need to connect widh db later
        console.log('Event Title:', eventTitle);
        console.log('Event Description:', eventDescription);
        console.log('Event Contact:', eventContact);
        console.log('Event Tags:', eventTags);
        console.log('Event Date:', eventDate);
        console.log('Event Time:', eventTime);
        console.log('Event Location:', eventLocation);
        console.log('Event Preview:', eventPreview);
    
        closeMenu();
    };
    


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

            <form className='flex flex-col h-full px-5 mt-8 text-sm' onSubmit={handleSubmit}>
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
                    onChange={handleInputChange}
                />

                <InputTitle isRequired={requiredSections["Description"]}>
                    Description
                </InputTitle>
                <textarea 
                    id='Description'
                    className='h-[7rem] rounded-[0.55rem] borderBlack70 pl-3 pt-1 w-full mb-3'
                    type='text'
                    name='eventDescription'
                    required={requiredSections["Description"]}  
                    maxLength={2000}
                    onChange={handleInputChange}
                />

                <div className='flex flex-row justify-between w-full gap-6 mb-3'>
                    <div className='flex flex-col w-full'>
                        <InputTitle isRequired={requiredSections["Contact Info"]}>
                            Contact Info
                        </InputTitle>
                        <textarea 
                            id='Contact Info'
                            className='rounded-[0.55rem] borderBlack70 pl-3 pt-1 h-full mb-3'
                            type='text'
                            name='eventContact'
                            required={requiredSections["Contact Info"]} 
                            maxLength={2000}
                            onChange={handleInputChange}
                        />

                        <InputTitle isRequired={requiredSections["Tags"]} >
                            Tags
                        </InputTitle>
                        <textarea 
                            id='Tags'
                            className='rounded-[0.55rem] borderBlack70 pl-3 pt-1 h-full'
                            type='text'
                            name='eventTags'
                            required={requiredSections["Tags"]} 
                            maxLength={2000}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />

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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />     
                    </div>
                </div>

                <div className='flex flex-col'>
                    <InputTitle isRequired={requiredSections["Preview Image"]}>
                        Preview Image
                    </InputTitle>
                    <input 
                        id='Preview Image'
                        className='pl-2 mt-2'
                        type='file'
                        name='eventPreview'
                        required={requiredSections["Preview Image"]}
                        onChange={handleInputChange}
                    />
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
