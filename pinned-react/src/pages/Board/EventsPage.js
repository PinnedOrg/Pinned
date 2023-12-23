import { useState, React, useEffect } from 'react'
import NewEventSystem from '../../components/board/new event/NewEventSystem'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PreviewImage from '../../components/event/render preview image/PreviewImage'
import { useBoardContext } from '../../context/BoardContext';


const EventsPage = () => {
  const { id } = useParams()
  const [events, setEvents] = useState(null);
  const { board, setBoard } = useBoardContext(id);

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
            {events && 
            <div className="flex gap-3 mt-5 ml-5">
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
                    <PreviewImage preview={event.preview}/>
                </div>   
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
