import React, { useState, useEffect } from 'react'
import PlusButton from './PlusButton'
import EditEventMenu from '../edit event menu/edit-event-menu'
import axios from 'axios'

const NewEventSystem = () => {
  const [isEditEventMenuOpen, setIsEditEventMenuOpen] = useState(false)

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        setData(response.data);
        console.log('Data has been received!');
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <PlusButton 
        isDisabled={isEditEventMenuOpen} 
        setIsEditEventMenuOpen={setIsEditEventMenuOpen}
        />
      
      {isEditEventMenuOpen && <EditEventMenu setIsEditEventMenuOpen={setIsEditEventMenuOpen} />}
    </div>
  )
}

export default NewEventSystem;

