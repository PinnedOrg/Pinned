import NewEventSystem from './pages/Board Template/components/new event/new-event-system';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage/>}/>
        <Route path="/NewEventPage" element={   
           <div className="h-screen w-screen bg-gray-50 text-gray-950 dark:[#282c34]">
            <header className="flex">
                <h1 className='text-center border w-full border-black bg-actionOrange h-[3rem]'>
                  Temp Heading
                </h1>
                <NewEventSystem />
            </header>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
