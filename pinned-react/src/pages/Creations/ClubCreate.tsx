import { useState } from 'react';
import axios from 'axios';
import PreviewImage from '../../components/Image/PreviewImage';
import { genreFilters } from '../../lib/data';
import { useMutation } from '@tanstack/react-query';
import { IClub } from '../../lib/types';

const postClub = async (formData: FormData): Promise<IClub> => {
  const response = await axios.post('http://localhost:8080/api/clubs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data as IClub;
};

const ClubCreate = () => {
  const mutation = useMutation<IClub, Error, FormData>({
    mutationFn: postClub,
    onSuccess: (data: IClub) => {
      console.log('Club created successfully:', data);
    },
    onError: (error: any) => {
      console.error('Error creating club:', error);
    },
  });
  
  // State to manage form data
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

  // State to manage the selected file
  const [file, setFile] = useState<File | null>(null);

  // Handle changes in text inputs and textareas for previews
  const handleClubChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle changes in select element for genreType
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle changes in file input
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

  // Handle form submission for previews
  const handleClubSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e === undefined) return;
    
    e.preventDefault();
    
    // Extract form data
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
        const result = await mutation.mutateAsync(data);
        console.log('Club created successfully:', result);
      } catch (error) {
        console.error('Error creating club:', error);
      }
  };

  return (
    <div className="flex items-center justify-center w-full gap-20 p-4">
      <div className="w-full max-w-xl p-4">
        <form onSubmit={handleClubSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Register Club</h2>
          {/* Form fields for club details */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleClubChange} required maxLength={50} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="overview">Overview (max 200 characters):</label>
            <textarea name="overview" value={formData.overview} onChange={handleClubChange} maxLength={200} required className="w-full px-3 py-2 leading-tight text-gray-700 border rounded resize-none focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">Description (max 2500 characters):</label>
            <textarea name="description" value={formData.description} onChange={handleClubChange} maxLength={2500} required className="w-full px-3 py-2 leading-tight text-gray-700 border rounded resize-none focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="genre">Genre:</label>
            <select name="genre" value={formData.genre} onChange={handleSelectChange} required className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline">
              {Object.keys(filters.Genre).map((genre: string) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="colorTheme">Color Theme:</label>
            <div className="flex items-center">
              <input type="color" name="colorTheme" value={formData.colorTheme || '#ffffff'} onChange={handleClubChange} className="w-10 h-10 p-0 border rounded appearance-none" />
              <span className="ml-4 text-gray-700">{formData.colorTheme || '#ffffff'}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="cost">Cost:</label>
            <input type="number" name="cost" value={formData.cost < 0 ? 0 : formData.cost || 0} onChange={handleClubChange} required min={0} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="location">Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleClubChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="meetingsFrequency">Meetings Frequency:</label>
            <input type="text" name="meetingsFrequency" value={formData.meetingsFrequency} onChange={handleClubChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleClubChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="instagram">Instagram:</label>
            <input type="text" name="instagram" value={formData.instagram} onChange={handleClubChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="discord">Discord:</label>
            <input type="text" name="discord" value={formData.discord} onChange={handleClubChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="facebook">Facebook:</label>
            <input type="text" name="facebook" value={formData.facebook} onChange={handleClubChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="logo">Logo:</label>
            <input type="file" name="logo" onChange={handleFileChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-xl p-4">
        <div className="mb-4">
          <h2 className="mb-4 text-2xl font-bold">Preview</h2>
          <div className="p-4 bg-white rounded shadow-md">
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-semibold break-words">Name: {formData.name}</p>
              <p className="text-sm text-gray-500 break-words">Overview: {formData.overview}</p>
              <p className="text-sm text-gray-500 break-words">Description: {formData.description}</p>
              <p className="text-sm text-gray-500 break-words">Genre: {formData.genre}</p>
              <p className="text-sm text-gray-500 break-words">Color Theme: {formData.colorTheme}</p>
              <p className="text-sm text-gray-500 break-words">Cost: {formData.cost}</p>
              <p className="text-sm text-gray-500 break-words">Location: {formData.location}</p>
              <p className="text-sm text-gray-500 break-words">Meetings Frequency: {formData.meetingsFrequency}</p>
              <p className="text-sm text-gray-500 break-words">Email: {formData.email}</p>
              <p className="text-sm text-gray-500 break-words">Instagram: {formData.instagram}</p>
              <p className="text-sm text-gray-500 break-words">Discord: {formData.discord}</p>
              <p className="text-sm text-gray-500 break-words">Facebook: {formData.facebook}</p>
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
  );
};

export default ClubCreate;

