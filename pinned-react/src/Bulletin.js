import React, { useState } from 'react';
import './App.css';
import { Board } from './Board';
import './Bulletin.css'

const Bulletin = () => {
  const [boards, setBoards] = useState([]);

  const addBoards = () => {
    setBoards([...boards, <Board/>]);
  };

  return (
    <div className="Bulletin">
      <button onClick={addBoards}>Add Board</button>
      <div className="board-container">
        {boards.map((board) => (
          <div className="board">
            {board}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bulletin;