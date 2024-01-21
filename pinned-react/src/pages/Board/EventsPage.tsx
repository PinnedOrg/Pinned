import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useBoardContext } from '../../context/BoardContext';
import NewEventSystem from '../../components/board/event system/NewEventSystem';
import EventPreview from '../../components/board/event/EventPreview';
import { EventInterface } from '@/lib/types';


const EventsPage = () => {
  const { id } = useParams()
  const [events, setEvents] = useState<Array<EventInterface>>([]);
  const { board } = useBoardContext(id);

   useEffect(() => {
    axios.get(`http://localhost:8080/api/events/of-board/${id}`)
     .then((allEvents) => {
        console.log(`GOT ${allEvents.data.length} events`)
        setEvents(allEvents.data);
     })
     .catch((error) => {
        console.log(error.message)
     })
   }, [id])

  return (
    <div>
      {board ? (
        <div className="h-screen w-screen bg-gray-50 text-gray-950 dark:[#282c34]">
          <h1>Events Page for <span className='font-bold'>{board.name}</span> </h1>
          <div className="flex-col">
            {events.length > 0 && 
            <div className="flex gap-3 mt-5 ml-5">
              {events.map((event, index) => (
                <EventPreview event={event} index={index} />
              ))}
            </div>}
          </div>
          <NewEventSystem />
        </div>
      ) : (
        <div>
          <h1>Board not found.</h1>
        </div>
      )}

    </div>
  )
}

export default EventsPage
