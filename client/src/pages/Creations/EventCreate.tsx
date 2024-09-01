import { useState } from 'react';
import axios from 'axios';

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
    } catch (error) {
        console.error('Error creating event:', error);
    }
};
  return (
    <div>      
      <form onSubmit={handleEventSubmit} className="max-w-md px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Create Event</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleEventChange} required className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleEventChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded resize-none focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="contact">Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleEventChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="tags">Tags (comma-separated):</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleEventChange} required className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="date">Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleEventChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="time">Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleEventChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="location">Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleEventChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="belongsToClub">Belongs to Club ID:</label>
          <input type="text" name="belongsToClub" value={formData.belongsToClub} onChange={handleEventChange} required className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="file">Upload Image:</label>
          <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreate;