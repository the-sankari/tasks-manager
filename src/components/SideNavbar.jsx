import React from "react";
import { BiSolidSun } from "react-icons/bi";
import { useTheme } from "./Theme";
import { BsSun } from "react-icons/bs";

const SideNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="bg-rose-700 text-white w-56 flex flex-col fixed bottom-0 top-20 z-50 left-0 right-100">
      <nav className="flex-1 justify-center text-2xl">
        <ul>
          <li className="p-3 pl-10 cursor-pointer group relative">
            <span className="absolute inset-0 bg-gray-700 w-0 transition-all duration-1000 ease-in-out group-hover:w-full"></span>
            <a href="/" className="relative z-10">
              Home
            </a>
          </li>
            
          <li className="p-3 pl-10 cursor-pointer group relative">
            <span className="absolute inset-0 bg-gray-700 w-0 transition-all duration-1000 ease-in-out group-hover:w-full"></span>
            <a href="/about" className="relative z-10 text-white">
              About
            </a>
          </li>
          <li className="p-3 pl-10 cursor-pointer group relative">
            <span className="absolute inset-0 bg-gray-700 w-0 transition-all duration-1000 ease-in-out group-hover:w-full"></span>
            <a href="/settings" className="relative z-10 text-white">
              Settings
            </a>
          </li>
          <li className="p-3 pl-10 cursor-pointer group relative">
            <span className="absolute inset-0 bg-gray-700 w-0 transition-all duration-1000 ease-in-out group-hover:w-full"></span>
            <a href="/troubleshoot" className="relative z-10 text-white">
              Troubleshoot
            </a>
          </li>
          <li>
            <div className="flex-none pl-10 pt-4">
              <button className="btn btn-square btn-ghost">
                <label className="swap swap-rotate w-12 h-12">
                  <input
                    type="checkbox"
                    onChange={toggleTheme}
                    checked={theme === "light" ? false : true}
                  />
                  <BiSolidSun className="w-8 h-8 swap-off" />
                  <BsSun className="w-8 h-8 swap-on" />
                </label>
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;
