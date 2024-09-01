import React from "react";
import { FaSearch } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-green-600 font-semibold">
          No.1 Website for Jobs Search
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-green-600">Dream Jobs</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Welcome to HireHub, the leading platform for job seekers and
          employers. Whether you’re looking to find your next opportunity or
          post jobs to attract top talent, HireHub makes it easy to search,
          apply, and connect with the right people.
        </p>
        <div className="flex-item w-2/5 h-12 shadow-xl border border-gray-300 pl-3 rounded-full gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs!!!"
            className="outline-none border-none w-full"
          />
          <button className="p-2 flex-item justify-center h-12 w-12 bg-green-600 text-white rounded-r-full">
            <FaSearch className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
