import NewEventSystem from './pages/components/bulletin/new event/new-event-system';


function App() {
  return (
    <div className="h-screen w-screen bg-gray-50 text-gray-950 dark:[#282c34]">
      <header className="flex">
          <h1 className='text-center border w-full border-black bg-actionOrange h-[3rem]'>
            Temp Heading
          </h1>
          <NewEventSystem />
      </header>
    </div>

    
  );
}

export default App;
