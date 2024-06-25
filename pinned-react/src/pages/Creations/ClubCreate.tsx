import { useState, useEffect } from 'react';
import axios from 'axios';
import PreviewImage from '../../components/Image/PreviewImage';

interface Club {
  _id: string;
  name: string;
  logo?: {
    data: {
      data: string | null;
    },
    extension: string | null;
  } | null;
  overview: string;
  description: string;
  genre: string;
  colorTheme?: string;
  cost: number;
  location?: string;
  meetingsFrequency?: string;
  email?: string;
  instagram?: string;
  discord?: string;
  facebook?: string;
}

const ClubCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    overview: '',
    description: '',
    genre: '',
    colorTheme: '#ffffff',
    cost: 0,
    location: '',
    meetingsFrequency: '',
    email: '',
    instagram: '',
    discord: '',
    facebook: '',
    logo: null as { data: {data :string | null}, extension: string | null } | null,
  });

  const [file, setFile] = useState<File | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/clubs`)
      .then((allClubs) => {
        console.log(`GOT ${allClubs.data.length} clubs`);
        setClubs(allClubs.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const renderClubsList = () => {
    if (clubs.length === 0) {
      return <p>No clubs available</p>;
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <div key={club._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-semibold">ID: {club._id}</p>
              <p className="text-lg font-semibold">Name: {club.name}</p>
              <p className="text-sm text-gray-500">Overview: {club.overview}</p>
              <p className="text-sm text-gray-500">Description: {club.description}</p>
              <p className="text-sm text-gray-500">Genre: {club.genre}</p>
              <p className="text-sm text-gray-500">Color Theme: {club.colorTheme}</p>
              <p className="text-sm text-gray-500">Cost: {club.cost}</p>
              <p className="text-sm text-gray-500">Location: {club.location}</p>
              <p className="text-sm text-gray-500">Meetings Frequency: {club.meetingsFrequency}</p>
              <p className="text-sm text-gray-500">Email: {club.email}</p>
              <p className="text-sm text-gray-500">Instagram: {club.instagram}</p>
              <p className="text-sm text-gray-500">Discord: {club.discord}</p>
              <p className="text-sm text-gray-500">Facebook: {club.facebook}</p>
                {club.logo && club.logo.data ? (
                <div className="flex items-center justify-center border-2 border-gray-500 max-h-[300px] h-[300px]">
                  <PreviewImage preview={club.logo} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] bg-gray-800 border-2 border-gray-500">
                  <p className="text-white">No Logo</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleClubChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = (reader.result as string).split(',')[1];
          const previewData = {
            data: {
              data: base64String
            },
            extension: selectedFile.type,
          };
          setFormData((prevState) => ({
            ...prevState,
            logo: previewData,
          }));
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClubSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e === undefined) return;
    
    e.preventDefault();

    const {
        name,
        overview,
        description,
        genre,
        colorTheme,
        cost,
        location,
        meetingsFrequency,
        email,
        instagram,
        discord,
        facebook,
      } = formData;
      
      const data = new FormData();
      data.append('name', name);
      data.append('overview', overview);
      data.append('description', description);
      data.append('genre', genre);
      data.append('colorTheme', colorTheme);
      data.append('cost', cost.toString());
      data.append('location', location);
      data.append('meetingsFrequency', meetingsFrequency);
      data.append('email', email);
      data.append('instagram', instagram);
      data.append('discord', discord);
      data.append('facebook', facebook);
      if (file) {
        data.append('logo', file);
      }

    try {
      const response = await axios.post('http://localhost:8080/api/clubs', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Club created successfully:', response);

      const allClubsResponse = await axios.get('http://localhost:8080/api/clubs');
      console.log(`GOT ${allClubsResponse.data.length} clubs`);

      setClubs(allClubsResponse.data);
    } catch (error) {
      console.error('Error creating club:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <div className="w-full p-4">
          <form onSubmit={handleClubSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Create Club</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
              <input type="text" name="name" value={formData.name || ''} onChange={handleClubChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="overview">Overview:</label>
              <textarea name="overview" value={formData.overview || ''} onChange={handleClubChange} className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
              <textarea name="description" value={formData.description || ''} onChange={handleClubChange} className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">Genre:</label>
              <input type="text" name="genre" value={formData.genre || ''} onChange={handleClubChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colorTheme">Color Theme:</label>
              <input type="text" name="colorTheme" value={formData.colorTheme || '#ffffff'} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost">Cost:</label>
              <input type="number" name="cost" value={formData.cost || 0} onChange={handleClubChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
              <input type="text" name="location" value={formData.location || ''} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meetingsFrequency">Meetings Frequency:</label>
              <input type="text" name="meetingsFrequency" value={formData.meetingsFrequency || ''} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
              <input type="email" name="email" value={formData.email || ''} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram">Instagram:</label>
              <input type="text" name="instagram" value={formData.instagram || ''} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discord">Discord:</label>
              <input type="text" name="discord" value={formData.discord || ''} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebook">Facebook:</label>
              <input type="text" name="facebook" value={formData.facebook || ''} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">Logo:</label>
              <input type="file" name="logo" onChange={handleFileChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <div className="bg-white shadow-md rounded p-4">
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-semibold">Name: {formData.name}</p>
                <p className="text-sm text-gray-500">Overview: {formData.overview}</p>
                <p className="text-sm text-gray-500">Description: {formData.description}</p>
                <p className="text-sm text-gray-500">Genre: {formData.genre}</p>
                <p className="text-sm text-gray-500">Color Theme: {formData.colorTheme}</p>
                <p className="text-sm text-gray-500">Cost: {formData.cost}</p>
                <p className="text-sm text-gray-500">Location: {formData.location}</p>
                <p className="text-sm text-gray-500">Meetings Frequency: {formData.meetingsFrequency}</p>
                <p className="text-sm text-gray-500">Email: {formData.email}</p>
                <p className="text-sm text-gray-500">Instagram: {formData.instagram}</p>
                <p className="text-sm text-gray-500">Discord: {formData.discord}</p>
                <p className="text-sm text-gray-500">Facebook: {formData.facebook}</p>
                {formData.logo ? (
                  console.log(formData.logo),
                  <div className="flex items-center justify-center border-2 border-gray-500 h-[300px]">
                    <PreviewImage preview={formData.logo} />
                  </div>
                ) : (
                  console.log(formData.logo),
                  <div className="flex items-center justify-center h-[300px] bg-gray-800 border-2 border-gray-500">
                    <p className="text-white">No Logo</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4">Clubs List</h2>
        {renderClubsList()}
      </div>
    </div>
  );
};

export default ClubCreate;
