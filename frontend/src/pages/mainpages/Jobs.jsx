import React from "react";
import Navbar from "./../../components/common/Navbar";
import FilterCard from "../../components/jobs/FilterCard";
import { jobOpenings } from "./../../utils/dummyjobs";
import Job from "../../components/jobs/Job";
import Footer from "./../../components/common/Footer";

const Jobs = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {jobOpenings.length <= 0 ? (
            <span>Jobs not found!</span>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 pb-5">
              <div className="grid md:grid-cols-3 grid-cols-2 gap-8 my-5">
                {jobOpenings.map((job, index) => (
                  <div>
                    <Job
                      key={index}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      positions={job.positions}
                      type={job.type}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobs;
