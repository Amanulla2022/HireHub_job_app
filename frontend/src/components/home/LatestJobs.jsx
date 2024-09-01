import React from "react";
import { jobOpenings } from "../../utils/dummyjobs";
import JobCard from "./JobCard";

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-green-600 ">Latest & Top</span> Job Openings!
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-5">
        {jobOpenings.slice(0, 6).map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            location={job.location}
            salary={job.salary}
            positions={job.positions}
            type={job.type}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
