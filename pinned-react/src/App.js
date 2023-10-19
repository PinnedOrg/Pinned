import logo from './logo.svg';
import './App.css';
import { LuFilter } from 'react-icons/lu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Pinned</h1>
        <h1 className="filter"><LuFilter /></h1>
      </header>
    </div>
  );
}

export default App;
