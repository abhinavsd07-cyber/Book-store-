import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BadgeCheck } from "lucide-react";
import SellBook from "../components/SellBook";
import EditProfile from "../components/EditProfile";
import { toast } from "react-toastify";
import { getUserDetails } from "../services/allAPI";

const Profile = () => {
  useEffect(() => {
    getUserData();
  }, []);

  const [sellBookFlag, setSellBookFlag] = useState(true);
  const [bookStatusFlag, setBookStatusFlag] = useState(false);
  const [purchaseHistoryFlag, setpurchaseHistoryFlag] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const getUserData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getUserDetails(header);

      if (apiResponse.status == 200) {
        setUserDetails(apiResponse.data.userDetails);
        console.log(apiResponse.data.userDetails);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while fetching user data ");
    }
  };

  return (
    <>
      <Header />
      <div className="h-35 bg-slate-900 relative text-white">
        <div className="h-50 w-50 bg-white absolute rounded-full top-10 left-12 overflow-hidden border-4 border-yellow-300">
          <img
            src={userDetails.profilePhoto}
            alt="profile photo"
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      <div className="flex justify-between mt-20 px-10 py-5 items-center ">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ml-5 ">{userDetails.userName}</h1>
          <span>
            <BadgeCheck className=" mx-2 text-blue-600" />
          </span>
        </div>
        <EditProfile userDetails={userDetails} />
      </div>
      <p className="px-15 py-8">{userDetails.bio}</p>

      <div className="flex justify-center">
        <button
          className="border p-2 m-1 rounded-2xl cursor-pointer"
          onClick={() => {
            setSellBookFlag(true);
            setBookStatusFlag(false);
            setpurchaseHistoryFlag(false);
          }}
        >
          Sell Book
        </button>
        <button
          className="border p-2 m-1 rounded-2xl cursor-pointer"
          onClick={() => {
            setSellBookFlag(false);
            setBookStatusFlag(true);
            setpurchaseHistoryFlag(false);
          }}
        >
          Book Status
        </button>
        <button
          className="border p-2 m-1 rounded-2xl cursor-pointer"
          onClick={() => {
            setSellBookFlag(false);
            setBookStatusFlag(false);
            setpurchaseHistoryFlag(true);
          }}
        >
          Purchase History
        </button>
      </div>

      <div>
        {sellBookFlag && <SellBook />}
        {bookStatusFlag && <div>Book Status</div>}
        {purchaseHistoryFlag && <div>Purchase History</div>}
      </div>

      <Footer />
    </>
  );
};

export default Profile;
