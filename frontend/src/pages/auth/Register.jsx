import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredential } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/apiSlice";

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  //   Redirect user after login/registration without losing their place.
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const { email, username, password, confirmPass } = data;

    if (password !== confirmPass) {
      toast.error("Password is not Matching!");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      // add user to store
      dispatch(setCredential({ ...res }));
      navigate(redirect);
      toast.success("Registered Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="px-[1rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem] w-full lg:w-[50%]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="w-[100%] max-w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Name"
              name="username"
              required
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm Password"
              value={data.confirmPass}
              name="confirmPass"
              onChange={handleChange}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-teal-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-[65rem] w-full lg:w-[40%] lg:block md:hidden sm:hidden rounded-lg"
      />
    </div>
  );
}

export default Register;
