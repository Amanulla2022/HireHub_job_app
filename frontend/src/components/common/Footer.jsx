import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex-item justify-between flex-col md:flex-row">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl sm:text-2xl font-bold">
              Hire <span className="text-green-600">Hub</span>
            </h1>
            <p className="text-sm">@ 2024 Your Company. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/in/amanulla-mulla-000678232/"
              target="_blank"
              className="hover:text-green-600"
            >
              <FaLinkedin className="text-5xl rounded-full p-2" />
            </a>
            <a
              href="https://github.com/Amanulla2022"
              target="_blank"
              className="hover:text-green-600"
            >
              <FaGithub className="text-5xl rounded-full p-2" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
