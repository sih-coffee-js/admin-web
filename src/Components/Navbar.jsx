import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi"; // Importing icons from react-icons

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [locations, setLocation] = useState("Location");

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex flex-grow justify-center">
        <Link
          to="/"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          About
        </Link>
        <Link
          to="/facilities"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          E-Facilities
        </Link>
        <Link
          to="/recycle"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Recycle
        </Link>
        <Link
          to="/ewaste"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          E-Waste
        </Link>
        <Link
          to="/contact"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Contact Us
        </Link>
        <Link
          to="/rules"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Rules
        </Link>
      </div>

      <h1 className="font-montserrat font-bold mr-5 md:ml-4 md:text-xl text-emerald-600 flex items-center gap-[1vh]">
        <FiMapPin aria-hidden="true" role="img" />
        {locations}
      </h1>
    </div>
  );
}

export default Navbar;
