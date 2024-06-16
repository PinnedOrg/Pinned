import { useState, useEffect } from 'react';
import axios from 'axios';
import PreviewImage from '../../components/Image/PreviewImage';

interface Event {
  _id: string;
  title: string;
  description: string;
  contact: string;
  tags: string[];
  date: string;
  time: string;
  location: string;
  belongsToClub: string;
  preview?: {
    data: string | null;
    extension: string | null;
  };
}

const EventCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: '',
    tags: '',
    date: '',
    time: '',
    location: '',
    belongsToClub: '',
    preview: null,
  });

  const [file, setFile] = useState<File | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events`)
     .then((allEvents) => {
        console.log(`GOT ${allEvents.data.length} events`)
        setEvents(allEvents.data);
     })
     .catch((error) => {
        console.log(error.message)
     })
   }, [])

  const renderEventsList = () => {
    if (events.length === 0) {
      return <p>No events available</p>;
    }

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentEvents.map((event) => (
          <div key={event._id} className="bg-white shadow-md rounded-lg p-4 max-h-128 overflow-hidden">
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{event.description}</p>
            <p className="text-sm text-gray-500 mb-2">Contact: {event.contact}</p>
            <p className="text-sm text-gray-500 mb-2">Tags: {event.tags.join(', ')}</p>
            <p className="text-sm text-gray-500 mb-2">Date: {event.date}</p>
            <p className="text-sm text-gray-500 mb-2">Time: {event.time}</p>
            <p className="text-sm text-gray-500 mb-2">Location: {event.location}</p>
            <p className="text-sm text-gray-500 mb-2">Belongs to Club ID: {event.belongsToClub}</p>
            <p className="text-sm text-gray-500 mb-2">Event ID: {event._id}</p>
            {event.preview && event.preview.data ? (
              <div className="flex items-center justify-center border-2 border-gray-500 max-h-[300px] h-[300px]">
                <PreviewImage preview={event.preview} class="max-h-[300px]"/>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] bg-gray-800 border-2 border-gray-500">
                <p className="text-white">No image</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e === undefined) return;

    e.preventDefault();

    const {
        title,
        description,
        contact,
        tags,
        date,
        time,
        location,
        belongsToClub,
        preview,
    } = formData;

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('contact', contact);
    data.append('tags', tags);
    data.append('date', date);
    data.append('time', time);
    data.append('location', location);
    data.append('belongsToClub', belongsToClub);
    if (file) {
      data.append('preview', file);
    }

    try {
        const response = await axios.post('http://localhost:8080/api/events', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Event created successfully:', response);

        const allEventsResponse = await axios.get('http://localhost:8080/api/events');
        console.log(`GOT ${allEventsResponse.data.length} events`);

        setEvents(allEventsResponse.data);
    } catch (error) {
        console.error('Error creating event:', error);
    }
};

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>      
      <form onSubmit={handleEventSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleEventChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleEventChange} className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleEventChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">Tags (comma-separated):</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleEventChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleEventChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleEventChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleEventChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="belongsToClub">Belongs to Club ID:</label>
          <input type="text" name="belongsToClub" value={formData.belongsToClub} onChange={handleEventChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">Upload Image:</label>
          <input type="file" onChange={handleFileChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Event</button>
      </form>

      <br />
      <br />
      <br />

      <div>
        <h2 className="text-2xl font-bold mb-4">Events List</h2>
        {renderEventsList()}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCreate;