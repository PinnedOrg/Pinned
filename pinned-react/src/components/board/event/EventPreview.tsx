
import axios from 'axios';

import PreviewImage from '../../Image/PreviewImage';
import { EventInterface } from '@/lib/types';

type EventPreviewProps = {
    event: EventInterface,
    index: number
}

const EventPreview = ({event, index}: EventPreviewProps) => {
    const handleDeleteClick = (id: string) => {
        axios.delete(`http://localhost:8080/api/events/${id}`)
            .then(() => {
            console.log("event deleted")
            })
            .catch((error) => {
            console.error(error)
            })
        }

  return (
    <div className="w-[24rem] h-[24rem] border border-primary" key={index}>
        <h1 className="mb-2">{event.title}</h1>
        <p className="mb-2">{event.description}</p>
        <ul className="mb-2">
            {event.tags.map((tag, i) => (
                <li key={i}>{tag}</li>
            ))}
        </ul>
        <p className="mb-2">{event.createdAt.toLocaleString()}</p>
        <p className="mb-2">{event.updatedAt.toLocaleString()}</p>
        <PreviewImage preview={event.preview}/>
        <button className="p-2 text-center text-white bg-gray-800" onClick={() => {handleDeleteClick(event._id)}}>Delete</button>
  </div>
  )
}

export default EventPreview;
