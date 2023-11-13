import React from "react";

const MainPage = () => {
  return (
    <>
      <div className="text-center">
        <header className="bg-actionOrange text-white flex flex-row justify-between text-2xl px-10 align-middle">
          <h1 className="self-center ml-10">Pinned</h1>
          <div className="flex flex-row">
            <div className="flex flex-row gap-1 mr-10">
              <div
                id="search_input"
                className="bg-slate-600 text-white rounded-full m-2"
              >
                <input
                  type="search"
                  placeholder="Search"
                  className="placeholder-white bg-slate-600 text-white text-sm py-2 px-5 rounded-full border-2 border-white"
                />
              </div>
              <button
                type="button"
                className="p-3 text-slate-600 border-none bg-none text-2xl m-auto rounded-full hover:text-white hover:bg-slate-600 hover:border-2 duration-150"
              >
                <BiSearchAlt />
              </button>
            </div>
            <h1 className="p-3 text-slate-600 border-none bg-none text-2xl m-auto rounded-full hover:text-white hover:bg-slate-600 hover:border-2 duration-15">
              <LuFilter />
            </h1>
            <div className="p-3 text-slate-600 border-none bg-none text-2xl m-auto rounded-full hover:text-white hover:bg-slate-600 hover:border-2 duration-15">
              <BsPersonCircle />
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default MainPage;
