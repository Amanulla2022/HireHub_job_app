import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const user = false;

  return (
    <div className="bg-white flex-item  justify-between h-16 mx-auto px-4 sm:px-5 lg:px-8 max-w-7xl">
      <div>
        <h1 className="text-2xl sm:text-2xl font-bold">
          Hire<span className="text-green-600">Hub</span>
        </h1>
      </div>
      <nav className="flex-item  gap-8 sm:gap-12">
        <ul className="flex-item font-medium  gap-4 sm:gap-6">
          <Link to="/" className="list-item">
            Home
          </Link>
          <Link to="/jobs" className="list-item">
            Jobs
          </Link>
          <Link to="/" className="list-item">
            Browse
          </Link>
        </ul>
        {!user ? (
          <div className="flex-item  gap-2">
            <Link to="/login">
              <button className="border-2 login-signup ">Login</button>
            </Link>
            <Link to="/signup">
              <button className="login-signup bg-green-600 text-white">
                SignUp
              </button>
            </Link>
          </div>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Candidate"
              className="rounded-full cursor-pointer"
            />
            {isHovered && (
              <div className="absolute flex-item flex-col gap-2 right-0 mt-2 w-36 sm:w-44 bg-white border rounded shadow-lg p-2">
                <div className="flex-item  gap-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Candidate"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm sm:text-md">Amanulla Mulla!</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      I am a recruiter.
                    </p>
                  </div>
                </div>
                <div className="flex-item flex-col justify-between  gap-1">
                  <div className="button-div">
                    <button className="buttons text-green-600">
                      <FaUserCircle className="buttons-icon" />
                      View Profile!
                    </button>
                  </div>
                  <div className="button-div">
                    <button className="buttons text-red-600">
                      <IoMdLogOut className="buttons-icon" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
