import NewEventSystem from "./pages/components/bulletin/new event/new-event-system";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import NavBar from "./pages/NavBar/NavBar.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route
          path="/NewEventPage"
          element={
            <div className="h-screen bg-gray-50 text-gray-950 dark:[#282c34]">
              <NavBar />
              <header className="flex">
                <NewEventSystem />
              </header>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
