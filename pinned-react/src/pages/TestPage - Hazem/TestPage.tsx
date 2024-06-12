
import { useState, useEffect } from 'react';
import axios from 'axios';
import PreviewImage from '/src/components/Image/PreviewImage';

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

const TestPage = () => {
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
  
    return (
      <ul className="divide-y divide-gray-200">
        {events.map((event) => (
          <li key={event._id} className="py-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <p className="text-lg font-semibold">{event.title}</p>
                <p className="text-sm text-gray-500 mb-2">{event.description}</p>
                <p className="text-sm text-gray-500 mb-2">Contact: {event.contact}</p>
                <p className="text-sm text-gray-500 mb-2">Tags: {event.tags}</p>
                <p className="text-sm text-gray-500 mb-2">Date: {event.date}</p>
                <p className="text-sm text-gray-500 mb-2">Time: {event.time}</p>
                <p className="text-sm text-gray-500 mb-2">Location: {event.location}</p>
                <p className="text-sm text-gray-500 mb-2">Belongs to Club ID: {event.belongsToClub}</p>
              </div>
              {event.preview && <div className="max-w-[500px]"><PreviewImage preview={event.preview} /></div>}
            </div>
          </li>
        ))}
      </ul>
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
        // Create the event
        const response = await axios.post('http://localhost:8080/api/events', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Event created successfully:', response);

        // Fetch all events again to update the events list
        const allEventsResponse = await axios.get('http://localhost:8080/api/events');
        console.log(`GOT ${allEventsResponse.data.length} events`);

        // Update the events state with the newly fetched events
        setEvents(allEventsResponse.data);
    } catch (error) {
        console.error('Error creating event:', error);
    }
};

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
      </div>

    </div>
  );
};

export default TestPage;
