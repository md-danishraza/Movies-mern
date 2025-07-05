import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-green-500 p-2 rounded-full shadow-lg"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed h-screen transition-transform duration-300 ease-in-out z-40
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex`}
      >
        <aside className="text-white w-64 bg-[#1e1e1e]">
          <ul className="py-4">
            {[
              { to: "/admin/movies/dashboard", label: "Dashboard" },
              { to: "/admin/movies/create", label: "Create Movie" },
              { to: "/admin/movies/genre", label: "Create Genre" },
              { to: "/admin/movies/list", label: "Update Movie" },
              { to: "/admin/movies/comments", label: "Comments" },
            ].map(({ to, label }) => (
              <li
                key={label}
                className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full mx-4 my-2"
              >
                <Link to={to} className="block p-2 pl-6">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

export default AdminSidebar;
