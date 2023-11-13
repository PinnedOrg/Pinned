import NewEventSystem from './pages/components/bulletin/new event/new-event-system';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage.js';
import MainPage from './pages/MainPage/MainPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage/>}/>
        <Route path="/NewEventPage" element={   
           <div className="h-screen w-screen bg-gray-50 text-gray-950 dark:[#282c34]">
            <MainPage />
          </div>
        }/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
