import React from "react";
import { CiBookmark } from "react-icons/ci";

const Job = ({ title, company, location, salary, positions, type }) => {
  return (
    <div className="job-card">
      <div className="flex-item justify-between">
        <p>1 day ago</p>
        <button className="rounded-full border-2 p-1">
          <CiBookmark />
        </button>
      </div>
      <div className="flex-item gap-2 my-2">
        <img
          src="https://via.placeholder.com/40"
          alt="Company logo"
          className="rounded-full cursor-pointer"
        />
        <div>
          <h1 className="font-medium text-lg">{company}</h1>
          <p className="text-sm text-gray-500">India {location}</p>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold my-2">{title}</h1>
        <p className="text-sm text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, totam!
        </p>
      </div>
      <div className="flex-item gap-4 mt-4">
        <p className="text-blue-600 job-p">{positions} Positions</p>
        <p className="text-orange-600 job-p">{type}</p>
        <p className="text-green-600 job-p">{salary}</p>
      </div>
      <div className="flex-item gap-4 mt-4">
        <button className="border-2 login-signup ">Details</button>
        <button className="login-signup bg-green-600 text-white">
          Save for later!
        </button>
      </div>
    </div>
  );
};

export default Job;
