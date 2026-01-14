import React, { useContext, useState } from "react";
import logo from "../assets/bookLogo.png";
import { Link, useNavigate } from "react-router-dom"; // useNavigate retures a function that lets you navigate programmatically in the browser in response to user interactions or effects.
import { googleLoginAPI, loginUser, registerUser } from "../services/allAPI";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { authContext } from "../context/authContext";


const Auth = ({ insideRegister }) => {
  const navigate = useNavigate();
  const {  saveToken } = useContext(authContext);

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const onRegisterClick = async () => {
    console.log(userData);
    try {
      if (
        userData.userName == "" ||
        userData.password == "" ||
        userData.email == ""
      ) {
        toast.error("Please complete the field");
      } else {
        let apiResponse = await registerUser(userData);
        if (apiResponse.status == 201) {
          toast.success("Successfully Registered");
          setUserData({
            userName: "",
            password: "",
            email: "",
          });
          navigate("/login");
        } else {
          toast.error(apiResponse.response.data.message);
          console.log(apiResponse);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  const onLoginClick = async () => {
    try {
      let reqBody = {
        email: userData.email,
        password: userData.password,
      };

      let apiResponse = await loginUser(reqBody);

      if (apiResponse.status == 200) {
        toast.success("Login Success");

        // localStorage.setItem("token", apiResponse.data.token);

        saveToken(apiResponse.data.token);

        if (apiResponse.data.existingUser.userType == "admin") {
          navigate("/admin-home");
        } else {
          navigate("/");
        }
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  const decodeFn = async (credentialResponse) => {
    console.log(credentialResponse);
    let decodedData = jwtDecode(credentialResponse.credential);
    console.log(decodedData);
    let payLoad = {
      userName: decodedData.name, ///////******** */
      email: decodedData.email,
      profilePhoto: decodedData.picture,
    };
    let apiResponse = await googleLoginAPI(payLoad);
    console.log(apiResponse);

    if (apiResponse.status == 201 || apiResponse.status == 200) {
      toast.success(apiResponse.data.message);
      // localStorage.setItem("token", apiResponse.data.token);
      saveToken(apiResponse.data.token);


      navigate("/");
    } else {
      toast.error(apiResponse.data.message);
    }
  };

  return (
    <>
      <div
        id="home-bg-img"
        className="h-screen w-full bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
          <div className="bg-white backdrop-blur-md w-96 rounded-2xl p-10 shadow-2xl border border-white/30">
            <div className="flex flex-col items-center">
              <img src={logo} alt="Logo" className="h-20 drop-shadow-md" />
              <h1 className="text-center text-2xl font-bold mt-3 text-slate-800 tracking-wide">
                {insideRegister ? "Register" : "LOGIN"}
              </h1>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email ID"
                className="border border-slate-300 placeholder:text-slate-500 w-full py-3 px-4 rounded-xl text-black outline-none  focus:border-blue-400 transition"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
              />

              {insideRegister ? (
                <input
                  type="text"
                  placeholder="User Name"
                  className="border border-slate-300 placeholder:text-slate-500 w-full py-3 px-4 rounded-xl text-black outline-none  focus:border-blue-400 transition"
                  value={userData.userName}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      userName: e.target.value,
                    })
                  }
                />
              ) : (
                <></>
              )}

              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 placeholder:text-slate-500 w-full py-3 px-4 rounded-xl text-black outline-none focus:border-blue-400 transition"
                value={userData.password}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
              />

              <div className="flex justify-between items-center">
                <p className="text-xs text-yellow-600">
                  *Never share your password
                </p>
                <p className="text-xs text-blue-600 hover:underline cursor-pointer">
                  Forgot Password?
                </p>
              </div>

              {insideRegister ? (
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold tracking-wide shadow-md"
                  onClick={onRegisterClick}
                >
                  Register
                </button>
              ) : (
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold tracking-wide shadow-md"
                  onClick={onLoginClick}
                >
                  Login
                </button>
              )}

              <div className="flex items-center mt-3">
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="px-3 text-slate-600 text-sm">OR</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  decodeFn(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />

              {insideRegister ? (
                <>
                  <h6 className="text-center text-slate-700 text-sm">
                    Already an exisiting user?
                    <Link
                      to={"/Login"}
                      className="text-blue-600 font-medium hover:underline mx-1"
                    >
                      Login
                    </Link>
                  </h6>
                </>
              ) : (
                <h6 className="text-center text-slate-700 text-sm">
                  New User?
                  <Link
                    to={"/register"}
                    className="text-blue-600 font-medium hover:underline mx-1"
                  >
                    Register
                  </Link>
                </h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
