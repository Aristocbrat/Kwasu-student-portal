import React from 'react';
import { FaPowerOff } from "react-icons/fa";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Header = ({ profileImage, isContentLoading }) => {
  const surname = localStorage.getItem("surname");

  let profileAvatar;
  if (isContentLoading) {
    profileAvatar = (
      <div className="skeleton h-10 w-10 rounded-full bg-gray-300"></div>
    );
  } else if (profileImage) {
    profileAvatar = (
      <img
        src={profileImage}
        alt="Profile"
        className="h-10 w-10 rounded-full object-cover border-2 border-yellow-400"
      />
    );
  } else {
    profileAvatar = (
      <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-lg">
        {surname ? surname.charAt(0).toUpperCase() : 'U'}
      </div>
    );
  }

  return (
    <div className="bg-white sticky top-0 z-10 mb-4 w-full h-auto text-green-800 border-b-4 border-green-800 shadow-sm px-2 py-3">
      <header>
        <div className="flex flex-nowrap justify-between items-center w-full gap-2">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="hover:bg-green-800 hover:text-white p-2 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-green-800 text-white font-semibold rounded-box z-10 mt-3 w-52 p-3 shadow"
              >
                <h2 className="p-2 border-b-yellow-300 border-b-4 font-extrabold uppercase text-lg xxs:text-base">
                  Student Menu
                </h2>
                {[
                  "Dashboard",
                  "Payment Section",
                  "ReQuery Payment",
                  "eVoting Platform",
                  "Class Attendance",
                  "Hostel Allocation",
                  "Course Registration",
                  "Hostel Exception Form",
                  "Add and Drop Form",
                  "LMS Enrolment",
                ].map((item, index) => (
                  <li key={index} className="p-2 border-b-4 group">
                    <a className="text-[13px] xxs:text-[12px] group-hover:text-yellow-400 duration-500">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ml-2">{profileAvatar}</div>
          </div>

          {/* Center Section */}
          <div className="hidden md:block whitespace-nowrap">
            <a className="text-2xl xxs:text-[15px] sm:text-3xl md:text-4xl lg:text-5xl text-green-800 font-bold">
              Welcome <span className="text-yellow-500 capitalize">{surname}</span>
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="text-green-800 hover:bg-green-800 hover:text-yellow-400 p-2 rounded-lg"
              >
                <FaArrowDownShortWide className="text-xl sm:text-2xl" />
              </div>
              <ul className="dropdown-content menu bg-white rounded-box z-10 w-64 p-2 shadow-sm">
                <div className="drophead bg-green-800 h-2"></div>
                <li className="p-2 border-b-4 group border-green-800">
                  <a className="text-[13px] xxs:text-[12px] group-hover:text-yellow-400 duration-500">
                    Payment Section
                  </a>
                </li>
                <li className="p-2 group">
                  <a className="text-[13px] xxs:text-[12px] group-hover:text-yellow-400 duration-500">
                    Payment Section
                  </a>
                </li>
              </ul>
            </div>
            <Link to="/">
              <button className="btn bg-green-800 text-white hover:bg-yellow-400 font-bold hover:text-green-800 duration-1000 border-0 px-2 py-2 flex items-center gap-1">
                <FaPowerOff className="text-xl sm:text-2xl" />
                <span className="hidden md:inline text-[13px] xxs:text-[11px] xs:text-[12px]">
                  Logout
                </span>
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
