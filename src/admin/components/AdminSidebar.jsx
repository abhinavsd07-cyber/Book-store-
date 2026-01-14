import { faHome, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBriefcase,
  faDashboard,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-950 text-amber-50 min-h-[90vh]">
      <h1 className="mt-10 text-2xl font-bold text-zinc-300 text-center">
        Admin Dashboard <FontAwesomeIcon icon={faDashboard} />
      </h1>
      <div className="mt-20 text-center p-10">
        <div>
          <Link to={"/admin-home"} className="text-amber-100 font-bold">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
        </div>

        <div className="mt-10">
          <Link to={"/admin-books"} className="text-amber-100 font-bold">
            <FontAwesomeIcon icon={faUser} className="mr-1" />
            Books/Users
          </Link>
        </div>
        <div className="mt-10">
          <Link to={"/admin-careers"} className="text-amber-100 font-bold">
            <FontAwesomeIcon icon={faBriefcase} className="mr-1" />
            Careers
          </Link>
        </div>
        <div className="mt-10">
          <Link to={"/admin-settings"} className="text-amber-100 font-bold">
            <FontAwesomeIcon icon={faGear} className="mr-1" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminSidebar;
