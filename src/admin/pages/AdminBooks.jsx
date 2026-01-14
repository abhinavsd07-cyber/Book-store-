import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { getAllBooks, getAllUsers } from "../../services/allAPI";

const AdminBooks = () => {
  const [showBooks, setShowBooks] = useState(true);
  const [showUsers, setshowUsers] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getBookData();
    getUserData();
  }, []);

  const getBookData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = { Authorization: `Bearer ${token}` };
      let apiResponse = await getAllBooks(header, "");
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

  const getUserData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = { Authorization: `Bearer ${token}` };
      let apiResponse = await getAllUsers(header, "");
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

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div>
          <div className="text-center mt-10">
            <button
              className="border  p-2 bg-blue-500 text-white font-semibold rounded-xl m-2 cursor-pointer hover:bg-blue-700 active:scale-95"
              onClick={() => {
                setShowBooks(true);
                setshowUsers(false);
              }}
            >
              Books
            </button>
            <button
              className="border  p-2 bg-blue-500 text-white font-semibold rounded-xl m-2 cursor-pointer hover:bg-blue-700 active:scale-95"
              onClick={() => {
                setShowBooks(false);
                setshowUsers(true);
              }}
            >
              Users
            </button>
          </div>
          {showBooks && (
            <div>
              {bookData?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 p-3 mt-10 gap-3">
                  {bookData?.map((eachBook, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-white p-4 shadow-xl border border-slate-200 flex flex-col items-center hover:shadow-2xl transition-shadow w-full md:w-60"
                    >
                      <img
                        src={eachBook.imgURL}
                        alt=""
                        className="w-40 md:w-48 h-56 md:h-64 object-cover rounded-md shadow"
                      />
                      <div className="mt-4 text-center">
                        <h3 className="font-bold w-full md:w-40">
                          {eachBook.title}
                        </h3>
                        <p className="text-gray-700 w-full md:w-40 mt-1">
                          {eachBook.author}
                        </p>
                        <p className="text-black font-semibold mt-3">
                          Rs {eachBook.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center min-h-[200px]">
                  <h1 className="text-xl text-red-500">No books added</h1>
                </div>
              )}
            </div>
          )}
          {showUsers && (
            <div>
              {userData?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 mt-10 gap-6">
                  {userData.map((eachUser, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                      <div className="flex flex-col items-center p-6">
                        <div className="w-24 h-24 mb-4">
                          <img
                            src={eachUser.profilePhoto}
                            alt={eachUser.userName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>

                        <h5 className="mb-1 text-lg font-semibold text-gray-900 text-center line-clamp-1">
                          {eachUser.userName}
                        </h5>

                        <span className="text-sm text-gray-500 mb-4 truncate w-full text-center">
                          {eachUser.email}
                        </span>

                        <p className="text-sm text-gray-600 italic text-center line-clamp-3 leading-relaxed">
                          {eachUser.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center min-h-[200px]">
                  <h1 className="text-xl text-red-500">No users found</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBooks;
