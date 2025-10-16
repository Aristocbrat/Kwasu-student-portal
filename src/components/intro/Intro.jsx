import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import kwasugate from '../../assets/images/kgateblur.png';
import kwasuLogo from '../../assets/images/kwasu.png';
import { FaEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Intro() {
  const [surname, setSurname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("matricNumber", username);
    localStorage.setItem("surname", surname);
    navigate("/Home");
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundImage: `url(${kwasugate})` }}
    >
      <div className="bg-cover bg-center w-full h-screen">
        <div className="Input-card w-full h-screen flex items-center justify-center px-4">
          <div className="card h-auto w-[90%] xs:w-[400px] sm:w-[500px] md:w-[600px] lg:w-[650px] xl:w-[700px] 2xl:w-[750px] 3xl:w-[800px] shadow-white bg-white rounded-br-[50px] rounded-tl-[60px]">
            <div className="card-body flex flex-col mx-auto items-center p-4 sm:p-6 md:p-8 justify-center">
              {/* KWASU Logo */}
              <div>
                <img src={kwasuLogo} alt="KWASU Logo" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
              </div>

              {/* Portal Title */}
              <h2 className="card-title text-2xl xxs:text-sm xs:text-xl sm:text-xl md:text-3xl lg:text-3xl uppercase text-center text-green-800 underline underline-offset-8 decoration-green-800 mt-4">
                <span className="font-bold">Kwasu </span>
                <span className="text-yellow-500">integrated Portal</span>
              </h2>

              {/* Login Form */}
              <div className="Logindetails w-full border-2 border-green-800 rounded-xl mt-6 px-2 sm:px-4 md:px-6 lg:px-8 max-w-xs sm:max-w-sm md:max-w-md">
                <form onSubmit={handleLogin} className="flex flex-col gap-4 py-6">
                  {/* Matriculation Number Input */}
                  <input
                    type="text"
                    placeholder="Matriculation number"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full bg-inherit text-[15px] sm:text-[16px] md:text-[17px] border-inherit text-green-800 font-semibold px-2 py-2"
                    required
                  />

                  {/* Surname Input (used as password) */}
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className="input input-bordered w-full pr-10 bg-inherit text-[15px] sm:text-[16px] md:text-[17px] border-inherit border-2 text-green-800 font-semibold px-2 py-2"
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-green-800"
                    >
                      {showPassword ? (
                        <FaEye className="text-xl sm:text-2xl" />
                      ) : (
                        <FaRegEyeSlash className="text-xl sm:text-2xl" />
                      )}
                    </span>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn w-full btn-success text-white text-[15px] sm:text-[16px] md:text-[17px] font-bold py-2 px-4 hover:text-yellow-300 transition duration-300"
                  >
                    Login
                  </button>
                </form>
              </div>

              {/* Additional Links */}
              <div className="moreloginoptions flex flex-col sm:flex-row items-center justify-center py-6 gap-4 sm:gap-0">
                <p className="text-green-800 text-[15px] sm:text-[17px] p-3 font-semibold border-b-2 sm:border-b-0 sm:border-r-2 border-green-800">
                  Forgot Password?{" "}
                  <span className="text-yellow-500">
                    <a
                      href="#"
                      className="hover:underline underline-offset-4 decoration-yellow-500 duration-500"
                    >
                      Click here
                    </a>
                  </span>
                </p>
                <p className="text-green-800 text-[15px] sm:text-[17px] p-2 font-semibold">
                  New User?{" "}
                  <span className="text-yellow-500">
                    <a
                      href="#"
                      className="hover:underline underline-offset-4 decoration-yellow-500 duration-500"
                    >
                      Register here
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
