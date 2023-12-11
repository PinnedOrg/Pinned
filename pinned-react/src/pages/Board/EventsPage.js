import {useState, React, useEffect} from 'react'
import NewEventSystem from '../../components/board/new event/NewEventSystem'
import axios from 'axios';


const EventsPage = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/events")
     .then((allEvents) => {
        console.log(`GOT ${allEvents.data.length} events`)
        setEvents(allEvents.data);
     })
     .catch((error) => {
        console.log(error.message)
     })
   }, [events])

  return (
    <div className="h-screen w-screen bg-gray-50 text-gray-950 dark:[#282c34]">
        <header>
            <h1 className='text-center border w-full border-black bg-actionOrange h-[3rem]'>
                Temp Heading
            </h1>

          <div className="flex-corl">
            {events && <div className="flex gap-3 mt-5 ml-5">
            {events.map((event, index) => (
           
                <div className="w-[24rem] h-[24rem] border border-actionOrange" key={index}>
                    <h1 className="mb-2">{event.title}</h1>
                    <p className="mb-2">{event.description}</p>
                    <ul className="mb-2">
                      {event.tags.map((tag, i) => (
                          <li key={i}>{tag}</li>
                      ))}
                    </ul>
                    <p className="mb-2">{event.createdAt}</p>
                    <p className="mb-2">{event.updatedAt}</p>
                </div>   
            ))}
         </div>}
        </div>


            <NewEventSystem />
        </header>
    </div>
  )
}

export default EventsPage
