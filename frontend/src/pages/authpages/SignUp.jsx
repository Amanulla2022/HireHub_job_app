import React from "react";
import Navbar from "./../../components/common/Navbar";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <div className="flex-item justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border-2 border-gray-300 rounded-xl p-4 my-10"
        >
          <h1 className="font-bold text-2xl mb-5 underline">Sign Up</h1>
          <div className="form-sub-div">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="form-inputs"
            />
          </div>
          <div className="form-sub-div">
            <label>Email Id</label>
            <input
              type="text"
              placeholder="amanmulla167@gmail.com"
              className="form-inputs"
            />
          </div>
          <div className="form-sub-div">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="9590397339"
              className="form-inputs"
            />
          </div>
          <div className="form-sub-div">
            <label>Password</label>
            <input
              type="text"
              placeholder="Enter Password"
              className="form-inputs"
            />
          </div>
          <div className="flex-item justify-between gap-4 mt-4 cursor-pointer">
            <div>
              <div className="flex-item gap-1 ">
                <input
                  type="radio"
                  name="view"
                  value="Candidate"
                  defaultChecked
                />
                <label>Candidate</label>
              </div>
              <div className="flex-item gap-1 ">
                <input type="radio" name="view" value="Recruiter" />
                <label>Recruiter</label>
              </div>
            </div>
            <div className="flex-item gap-1">
              <label className="text-gray-700 font-semibold">Profile:</label>
              <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-800">
                Choose File
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <button className="mt-4 w-1/4 login-signup hover:no-underline bg-black text-white">
            SignUp
          </button>
          <p className="mt-4">
            Already have an account?
            <span>
              {" "}
              <Link to="/login" className="text-green-600">
                Login
              </Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
