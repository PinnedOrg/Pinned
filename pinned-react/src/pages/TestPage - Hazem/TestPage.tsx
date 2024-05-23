import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
  _id: string;
  title: string;
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
    belongsToClub: '', // should be set to a valid club ID
  });

  const [file, setFile] = useState<File | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const renderEventsList = () => {
    if (events.length === 0) {
      return <p>No events available</p>;
    }

    const eventItems = [];
    for (const event of events) {
      eventItems.push(
        <li key={event._id}>
          <strong>ID:</strong> {event._id}, <strong>Title:</strong> {event.title}
        </li>
      );
    }
    return eventItems;
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

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file) {
      data.append('file', file);
    }

    try {
      const response = await axios.post('/api/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      fetchEvents(); // Refresh events list
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <h1>Test Page for Hazem</h1>
      
      <form onSubmit={handleEventSubmit}>
        <h2>Create Event</h2>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleEventChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleEventChange}></textarea>
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleEventChange} />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleEventChange} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleEventChange} />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleEventChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleEventChange} />
        </div>
        <div>
          <label>Belongs to Club ID:</label>
          <input type="text" name="belongsToClub" value={formData.belongsToClub} onChange={handleEventChange} required />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Create Event</button>
      </form>

      <div>
        <h2>Events List</h2>
        <ul>
          {renderEventsList()}
        </ul>
      </div>
    </div>
  );
};

export default TestPage;
