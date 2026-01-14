import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import {
  getAllApplications,
  getAllBooks,
  getAllJobs,
  getAllUsers,
} from "../../services/allAPI";
import { authContext } from "../../context/authContext";

const AdminHome = () => {
  const [userData, setUserData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [ApplicationsData, setApplicationData] = useState([]);
  let { token } = useContext(authContext);

  useEffect(() => {
    getUserAll();
    getBookData();
    getAllApplicationsdata();
    getJobData();
  }, []);

  const getUserAll = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = { Authorization: `Bearer ${token}` };
      let apiResponse = await getAllUsers(header, "");
      console.log("All userDetails", apiResponse.data);
      if (apiResponse.status == 200) {
        setUserData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch book data");
    }
  };

  const getAllApplicationsdata = async () => {
    try {
      const header = {
        Authorization: `Bearer ${token}`,
      };

      const apiresponse = await getAllApplications(header);

      console.log("this application data", apiresponse.data.allApplications);

      setApplicationData(apiresponse.data.allApplications);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = { Authorization: `Bearer ${token}` };
      let apiResponse = await getAllBooks(header, "");
      console.log("All books details", apiResponse.data.bookData);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.bookData);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch book data");
    }
  };

  const getJobData = async () => {
    try {
      let apiresponse = await getAllJobs();
      console.log(apiresponse);
      if (apiresponse.status == 200) {
        setJobData(apiresponse.data);
      } else {
        toast.error(apiresponse.response.data.message);
      }
    } catch (error) {
      console.log(object);
      toast.error("Something went wrong in the server");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div className="grid grid-cols-4 flex flex-col items-center">
          <div
            className="bg-neutral-primary-soft block  p-6 border border-default rounded-base shadow-xs"
            style={{ height: "300px" }}
          >
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
              Total Users
            </h5>
            <p className="text-body mb-6">{userData.length}</p>
            <a
              href="#"
              className="inline-flex items-center bg-amber-800 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Read more
              <svg
                className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
          <div
            className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs "
            style={{ height: "300px" }}
          >
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
              Total Books
            </h5>
            <p className="text-body mb-6">{bookData.length}</p>
            <a
              href="#"
              className="inline-flex items-center  bg-amber-800 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Read more
              <svg
                className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
          <div
            className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs"
            style={{ height: "300px" }}
          >
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
              Total Job openings
            </h5>
            <p className="text-body mb-6">{jobData.length}</p>
            <a
              href="#"
              className="inline-flex items-center  bg-amber-800 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Read more
              <svg
                className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
          <div
            className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs"
            style={{ height: "300px" }}
          >
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
              Total Applications
            </h5>
            <p className="text-body mb-6">{ApplicationsData.length}</p>
            <a
              href="#"
              className="inline-flex items-center  bg-amber-800 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Read more
              <svg
                className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
