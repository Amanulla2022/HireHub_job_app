import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./../../components/common/Navbar";
import { BASE_URL } from "../../utils/constant";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [input, setInput] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BASE_URL}/person/login`, input, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/");
        toast.success(response.data.message);
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("An error occurred during login!");
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
          <h1 className="font-bold text-2xl mb-5 underline">Login</h1>
          <div className="form-sub-div">
            <label>Email Id</label>
            <input
              type="text"
              value={input.emailId}
              name="emailId"
              onChange={changeEventHandler}
              placeholder="amanmulla167@gmail.com"
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
          </div>
          {loading ? (
            <ClipLoader color="#3498db" className="h-8 w-8" />
          ) : (
            <button className="mt-4 w-1/4 login-signup hover:no-underline bg-black text-white">
              Login
            </button>
          )}

          <p className="mt-4">
            Don't have an account?
            <span>
              <Link to="/signup" className="text-green-600">
                SignUp
              </Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
