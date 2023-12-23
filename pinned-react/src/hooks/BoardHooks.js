export const setBoardToLocalStorage = (board) => {
    localStorage.setItem(`Board ${board._id}`, JSON.stringify(board));
};

export const getBoardFromLocalStorage = (id) => {
    console.log(`Getting Board ${id} from local storage`);
    const storedBoard = localStorage.getItem(`Board ${id}`);
    return storedBoard ? JSON.parse(storedBoard) : null;
  };