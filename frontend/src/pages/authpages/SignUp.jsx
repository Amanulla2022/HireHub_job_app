import React, { useState } from "react";
import Navbar from "./../../components/common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../../utils/constant";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    emailId: "",
    phonenumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (
      !input.fullname ||
      !input.emailId ||
      !input.phonenumber ||
      !input.password ||
      !input.role
    ) {
      toast.error("Please fill in all the required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", input.fullname);
    formData.append("emailId", input.emailId);
    formData.append("phoneNumber", input.phonenumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BASE_URL}/person/register`,
        formData,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigate("/login");
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred during registration!");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex-item justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitForm}
          className="w-1/2 border-2 border-gray-300 rounded-xl p-4 my-10"
        >
          <h1 className="font-bold text-2xl mb-5 underline">Sign Up</h1>
          <div className="form-sub-div">
            <label>Full Name</label>
            <input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter Full Name"
              className="form-inputs"
            />
          </div>
          <div className="form-sub-div">
            <label>Email Id</label>
            <input
              type="email"
              value={input.emailId}
              name="emailId"
              onChange={changeEventHandler}
              placeholder="amanmulla167@gmail.com"
              className="form-inputs"
            />
          </div>
          <div className="form-sub-div">
            <label>Phone Number</label>
            <input
              type="text"
              value={input.phonenumber}
              name="phonenumber"
              onChange={changeEventHandler}
              placeholder="9590397339"
              className="form-inputs"
            />
          </div>
          <div className="form-sub-div">
            <label>Password</label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Password"
              className="form-inputs"
            />
          </div>
          <div className="flex-item justify-between gap-4 mt-4 cursor-pointer">
            <div>
              <div className="flex-item gap-1 ">
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  onChange={changeEventHandler}
                  checked={input.role === "candidate"}
                />
                <label>Candidate</label>
              </div>
              <div className="flex-item gap-1 ">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  onChange={changeEventHandler}
                  checked={input.role === "recruiter"}
                />
                <label>Recruiter</label>
              </div>
            </div>
            <div className="flex-item gap-1">
              <label className="text-gray-700 font-semibold">Profile:</label>
              <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-800">
                Choose File
                <input
                  type="file"
                  className="hidden cursor-pointer"
                  onChange={changeFileHandler}
                />
              </label>
            </div>
          </div>{" "}
          {loading ? (
            <ClipLoader color="#3498db" className="h-8 w-8" />
          ) : (
            <button className="mt-4 w-1/4 login-signup hover:no-underline bg-black text-white">
              SignUp
            </button>
          )}
          <p className="mt-4">
            Already have an account?
            <span>
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
