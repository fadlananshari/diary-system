import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Logo"
            className="h-8 w-auto"
          />
          <span className="text-blue-400 text-xl font-semibold ml-2">Diary System</span>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-blue-400 hover:text-blue-500">
            Profile
          </Link>
          <Link to="/diaries" className="text-blue-400 hover:text-blue-500">
            List Diary
          </Link>
          <Link to="/kodepos" className="text-blue-400 hover:text-blue-500">
            Kode Pos
          </Link>
        </div>

        {/* Toggle Button untuk Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-400 focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white py-2 flex flex-col items-center space-y-2">
          <Link to="#" className="text-blue-400 hover:text-blue-500">
            Home
          </Link>
          <Link to="#" className="text-blue-400 hover:text-blue-500">
            About
          </Link>
          <Link to="#" className="text-blue-400 hover:text-blue-500">
            Services
          </Link>
          <Link to="#" className="text-blue-400 hover:text-blue-500">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
