import React from "react";

const JobCard = ({ title, company, location, salary, positions, type }) => {
  return (
    <div className="job-card">
      <div className="flex-item justify-between">
        <p className="font-medium text-lg ">{company}</p>
        <p className="text-sm text-gray-500">India {location}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold my-2">{title}</h2>
        <p className="text-sm text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          inventore! Consequuntur
        </p>
      </div>
      <div className="flex-item gap-4 mt-4">
        <p className="text-blue-600 job-p">{positions} Positions</p>
        <p className="text-orange-600 job-p">{type}</p>
        <p className="text-green-600 job-p">{salary}</p>
      </div>
    </div>
  );
};

export default JobCard;
