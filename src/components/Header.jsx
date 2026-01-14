import bookLogo from "../assets/bookLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { authContext } from "../context/authContext";


const Header = () => {
  const navigate = useNavigate();
  const {  removeToken } = useContext(authContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const onClickLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <>
      <header>
        <div className="grid grid-cols-3 items-center p-4">
          <img src={bookLogo} alt="" className="h-10" />

          <h1 className="text-3xl font-semibold text-center">BOOK STORE</h1>

          <div className="flex items-center justify-end gap-3">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-2xl hover:text-pink-600 hover:scale-110"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-2xl hover:text-sky-700 hover:scale-110"
            />
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-2xl hover:scale-110"
            />
            {isLoggedIn ? (
              <>
                <Dropdown 
                  label={
                    <div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                        alt=""
                        className="h-9 w-9 rounded-full"
                      />
                    </div>
                  }
                  dismissOnClick={false}
                  className=" text-black  "
                >
                  <div className="text-center w-25">
                    <Link to={"/profile"}>Profile</Link>
                  </div>
                  <div
                    className="text-center cursor-pointer"
                    onClick={onClickLogout}
                  >
                    Logout
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="border rounded-3xl font-bold hover:bg-black hover:text-white px-3 py-1 ms-3"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <nav>
          <ul className="p-3 bg-slate-900 flex text-slate-200 gap-8 items-center justify-center">
            <li className="font-semibold hover:scale-110 hover:text-white">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="font-semibold hover:scale-110 hover:text-white">
              <Link to={"/books"}>Books</Link>
            </li>
            <li className="font-semibold hover:scale-110 hover:text-white">
              <Link to={"/careers"}>Careers</Link>
            </li>
            <li className="font-semibold hover:scale-110 hover:text-white">
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
