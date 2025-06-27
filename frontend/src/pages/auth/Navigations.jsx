import React from "react";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { useLogoutMutation } from "../../redux/api/apiSlice";

function Navigations() {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logOutTrigger] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logOutTrigger().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-10  right-[12rem] sm:right-[13rem] md:right-[15rem] transform translate-x-1/2 translate-y-1/2 z-50 text-white bg-[#0f0f0f] border w-[80%] sm:w-[50%]  lg:w-[30%] px-[4rem] mb-[2rem] rounded">
      <section className="flex justify-between items-center">
        {/* Section 1 */}
        <div className="flex justify-center items-center mb-[2rem]">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
            title="home"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]"
            title="movies"
          >
            <MdOutlineLocalMovies className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
        </div>
        {/* SECTION 2 */}
        <div className="relative">
          {/* toggle btn if user then show with username */}
          <button
            onClick={toggleDropDown}
            className="text-gray-800 focus:outline-none cursor-pointer"
          >
            {userInfo ? (
              <span className="text-white">{userInfo.username}</span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 ml-1 transition-transform duration-500 ${
                  dropDownOpen ? "transform -rotate-y-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>
          {/* DROPDOWN - if user is admin then show dashboard , absolute article on left */}
          {dropDownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 mr-14 w-[10rem] space-y-2 bg-white text-gray-600 ${
                !userInfo.isAdmin ? "-top-20" : "-top-24"
              }`}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
          {/* no dropdown if no user */}
          {/* Login and register if no user */}
          {!userInfo && (
            <ul className="flex">
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2 mb-[2rem]"
                  title="login"
                >
                  <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2 ml-[1rem]"
                  title="register"
                >
                  <AiOutlineUserAdd size={26} />
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default Navigations;
