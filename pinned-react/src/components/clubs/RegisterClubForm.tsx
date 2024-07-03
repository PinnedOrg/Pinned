import axios from 'axios';
import PreviewImage from '../../components/Image/PreviewImage';
import { genreFilters } from '../../lib/data';
import { useMutation } from '@tanstack/react-query';
import { IClub } from '../../lib/types';
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'

const RegisterClubForm = () => {
    const { getToken } = useAuth()
    
    const postClub = async (formData: FormData): Promise<IClub> => {
        const token = await getToken()
        const response = await axios.post('http://localhost:8080/api/clubs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      
        return response.data as IClub;
      };

    const mutation = useMutation<IClub, Error, FormData>({
        mutationFn: postClub
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
        apply_link: '',
        facts: [{ title: '', description: '' }],
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
            apply_link,
            facts,
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
        data.append('apply_link', apply_link);
        
        facts.forEach((fact, index) => {
            data.append(`facts[${index}][title]`, fact.title);
            data.append(`facts[${index}][description]`, fact.description);
        });

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

    const handleChangeFact = (index: number, type: 'title' | 'description') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newFacts = [...formData.facts];
        newFacts[index][type] = value;
        setFormData((prevState) => ({ ...prevState, facts: newFacts }));
    };

    const handleDeleteFact = (index: number) => {
        const newFacts = [...formData.facts];
        newFacts.splice(index, 1);
        setFormData((prevState) => ({ ...prevState, facts: newFacts }));
    };
    
    return (
        <div className="flex justify-center items-center w-full p-4 gap-20">
            <div className="w-full max-w-xl p-4">

                {/* Form Section */}
                <form onSubmit={handleClubSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4">Register Club</h2>
                    {/* Form fields for club details */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleClubChange} required maxLength={50} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="overview">Overview (max 100 characters):</label>
                        <textarea name="overview" value={formData.overview} onChange={handleClubChange} maxLength={100} required className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description (max 2500 characters):</label>
                        <textarea name="description" value={formData.description} onChange={handleClubChange} maxLength={2500} required className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">Genre:</label>
                        <select name="genre" value={formData.genre} onChange={handleSelectChange} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="" disabled>Select Genre</option>
                            {Object.keys(genreFilters).map((genre) => (
                            <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colorTheme">Color Theme:</label>
                        <div className="flex items-center">
                            <input type="color" name="colorTheme" value={formData.colorTheme || '#ffffff'} onChange={handleClubChange} className="appearance-none border rounded w-10 h-10 p-0" />
                            <span className="ml-4 text-gray-700">{formData.colorTheme || '#ffffff'}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost">Cost:</label>
                        <input type="number" name="cost" value={formData.cost < 0 ? 0 : formData.cost || 0} onChange={handleClubChange} required min={0} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
                        <input type="text" name="location" value={formData.location} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meetingsFrequency">Meetings Frequency:</label>
                        <input type="text" name="meetingsFrequency" value={formData.meetingsFrequency} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram">Instagram:</label>
                        <input type="text" name="instagram" value={formData.instagram} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discord">Discord:</label>
                        <input type="text" name="discord" value={formData.discord} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebook">Facebook:</label>
                        <input type="text" name="facebook" value={formData.facebook} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apply_link">"Apply Now" Link:</label>
                        <input type="text" name="apply_link" value={formData.apply_link} onChange={handleClubChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facts">Facts:</label>
                        {formData.facts.map((fact, index) => (
                            <div key={index} className="flex items-center gap-4 mb-4">
                                <input type="text" name="title" value={fact.title} onChange={handleChangeFact(index, 'title')} required placeholder="Title" className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <input type="text" name="description" value={fact.description} onChange={handleChangeFact(index, 'description')} required placeholder="Description" className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <button type="button" onClick={() => handleDeleteFact(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                                    Delete
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => {
                                const newFacts = [...formData.facts];
                                newFacts.push({ title: '', description: '' });
                                setFormData((prevState) => ({ ...prevState, facts: newFacts }));
                        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Fact</button>
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

            {/* Preview Section */}
            <div className="w-full max-w-xl p-4">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-4">Preview</h2>
                    <div className="bg-white shadow-md rounded p-4">
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
                            <p className="text-sm text-gray-500 break-words">Apply Now: <a href={formData.apply_link} target="_blank" rel="noopener noreferrer">{formData.apply_link}</a></p>
                            {formData.facts.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 font-bold">Facts:</p>
                                    <ul className="list-disc pl-5">
                                        {formData.facts.map((fact, index) => (
                                            <li key={index} className="text-sm text-gray-500 break-words">
                                                <span className="font-bold">{fact.title}: </span>{fact.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {formData.logo ? (
                                <div className="flex items-center justify-center border-2 border-gray-500 h-[300px]">
                                    <PreviewImage preview={formData.logo} />
                                </div>
                            ) : (
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

export default RegisterClubForm;