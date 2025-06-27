import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredential } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/apiSlice";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  //   Redirect user after login/registration without losing their place.
  // search is query string of current url
  const { search } = useLocation();
  // parsing redirect query param
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const { email, password } = data;

    try {
      const res = await login({ email, password }).unwrap();
      // add user to store
      dispatch(setCredential({ ...res }));
      // redirecting to intended url
      navigate(redirect);
      toast.success("Registered Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <section className="px-[1rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem] w-full lg:w-[50%] ">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className=" w-[100%] max-w-[40rem] ">
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
                required
                name="email"
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
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In ..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-teal-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-auto w-full lg:w-[40%] lg:block  sm:hidden rounded-lg mt-[5rem]"
        />
      </section>
    </div>
  );
}

export default Login;
