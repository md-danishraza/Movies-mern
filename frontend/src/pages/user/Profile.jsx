import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "../../redux/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredential } from "../../redux/features/auth/authSlice";
function Profile() {
  const initalState = {
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  };
  const [data, setData] = useState(initalState);

  const { userInfo } = useSelector((state) => state.auth);
  // load default values from state
  useEffect(() => {
    setData((data) => {
      return {
        ...data,
        username: userInfo.username,
        email: userInfo.email,
      };
    });
  }, [userInfo]);

  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    const { email, username, password, confirmPass } = data;

    if (password !== confirmPass) {
      toast.error("Password is not Matching!");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      // add user to store
      dispatch(setCredential({ ...res }));
      toast.success("Profile Updated Successfully!");
      setData(() => {
        return initalState;
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <div>
      <div className="container mx-auto p-4 mt-[2rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4 ">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-4 rounded-sm w-full"
                  name="username"
                  required
                  value={data.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-sm w-full"
                  name="email"
                  required
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-4 rounded-sm w-full"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-input p-4 rounded-sm w-full"
                  name="confirmPass"
                  required
                  value={data.confirmPass}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600"
                >
                  Update
                </button>

                {isLoading && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
