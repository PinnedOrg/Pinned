import logo from "./logo.svg";
import "./App.css";
import { LuFilter } from "react-icons/lu";
import { BiSearchAlt } from "react-icons/bi";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Pinned</h1>
        <div className="right_header">
          <div className="search_function">
            <div id="search_input" className="search_bar">
              <input type="search" placeholder="Search" id="form_one" className="search_bar" />
            </div>
            <button type="button" className="button">
              <BiSearchAlt />
            </button>
          </div>
          <h1 className="filter">
            <LuFilter />
          </h1>
        </div>
      </header>
    </div>

    
  );
}

export default App;
