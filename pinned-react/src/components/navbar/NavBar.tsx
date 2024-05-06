import { LuFilter } from "react-icons/lu";
import { BiSearchAlt } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";

const NavBar = () => {
  return (
    <div className="text-center">
      <header className="flex flex-row justify-between px-10 text-2xl text-white align-middle bg-primary">
        <h1 className="self-center ml-10">Pinned</h1>
        <div className="flex flex-row">
          <div className="flex flex-row gap-1 mr-10">
            <div
              id="search_input"
              className="m-2 text-white rounded-full bg-slate-600"
            >
              <input
                type="search"
                placeholder="Search"
                className="px-5 py-2 text-sm text-white placeholder-white border-2 border-white rounded-full bg-slate-600"
              />
            </div>
            <button
              type="button"
              className="p-3 m-auto text-2xl duration-150 border-none rounded-full text-slate-600 bg-none hover:text-white hover:bg-slate-600 hover:border-2"
            >
              <BiSearchAlt />
            </button>
          </div>
          <h1 className="p-3 m-auto text-2xl duration-150 border-none rounded-full text-slate-600 bg-none hover:text-white hover:bg-slate-600 hover:border-2">
            <LuFilter />
          </h1>
          <div className="p-3 m-auto text-2xl duration-150 border-none rounded-full text-slate-600 bg-none hover:text-white hover:bg-slate-600 hover:border-2">
            <BsPersonCircle />
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
