import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { getUserDetails, updateProfile } from "../../services/allAPI";

const AdminSettings = () => {
  const [previewImage, setPreviewImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/16794/16794610.png"
  );

  const [adminData, setAdminData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
  });

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getUserDetails(header);
      if (apiResponse.status == 200) {
        console.log(apiResponse.data.userDetails);
        setAdminData(apiResponse.data.userDetails);
        setPreviewImage(
          `http://localhost:3000/uploads/${apiResponse.data.userDetails.profilePhoto}`
        );
      } else {
        toast.error(apiResponse.data.response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while fetching admin data");
    }
  };

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    URL.createObjectURL(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    setPreviewImage(URL.createObjectURL(e.target.files[0]));

    setAdminData({
      ...adminData,
      profilePhoto: e.target.files[0],
    });
  };

  const onSubmitClick = async () => {
    try {
      if (
        adminData.userName == "" ||
        adminData.password == "" ||
        adminData.confirmPassword == "" ||
        adminData.profilePhoto == ""
      ) {
        toast.error("Please fill the form");
      } else {
        if (adminData.password == adminData.confirmPassword) {
          let reqBody = new FormData();
          for (let key in adminData) {
            reqBody.append(key, adminData[key]);
          }

          let token = localStorage.getItem("token");
          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };

          let apiResponse = await updateProfile(adminData._id, reqBody, header);

          if (apiResponse.status == 200) {
            console.log(apiResponse);
            toast.success(apiResponse.data.message);
          } else {
            toast.error(apiResponse.response.data.message);
          }
        } else {
          toast.error("Password and confirm password must bre the same");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while updating profile ");
    }
  };

  const onResetClick = () => {
    setAdminData({
      userName: "",
      password: "",
      confirmPassword: "",
      profilePhoto: "",
    });
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div className="m-4">
          <h1 className="text-2xl font-bold text-center ">Settings</h1>
          <div className="grid grid-cols-2 pt-8">
            <div>
              <p className="text-center font-semibold my-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora beatae perspiciatis officiis ea corporis asperiores
                saepe rerum voluptatibus vitae amet?
              </p>
              <p className="text-center font-semibold my-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora beatae perspiciatis officiis ea corporis asperiores
                saepe rerum voluptatibus vitae amet?
              </p>
            </div>
            <div className="border p-8 bg-slate-950 rounded-2xl mx-3">
              <div className="flex flex-col items-center w-full">
                <label
                  htmlFor="img"
                  className="flex justify-center flex-col items-center border"
                >
                  <input
                    type="file"
                    name=""
                    id="img"
                    className="text-slate-950"
                    onChange={(e) => onImageChange(e)}
                  />
                  <img src={previewImage} alt="" className="w-30" />
                </label>
              </div>

              <div className="flex flex-col gap-3 mt-3">
                <input
                  type="text"
                  placeholder="username"
                  className="border border-neutral-500 rounded-xl px-3 py-2 text-neutral-100"
                  value={adminData.userName}
                  onChange={(e) =>
                    setAdminData({ ...adminData, userName: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="password"
                  className="border border-neutral-500 rounded-xl px-3 py-2 text-neutral-100"
                  value={adminData.password}
                  onChange={(e) =>
                    setAdminData({ ...adminData, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="confirm password"
                  className="border border-neutral-500 rounded-xl px-3 py-2 text-neutral-100"
                  value={adminData.confirmPassword}
                  onChange={(e) =>
                    setAdminData({
                      ...adminData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="flex gap-5 justify-center mt-5">
                  <button
                    className="px-2 py-1 rounded-xl bg-red-200 border-red-500  text-red-500 font-semibold"
                    onClick={onResetClick}
                  >
                    Reset
                  </button>
                  <button
                    className="px-2 py-1 rounded-xl bg-green-200 border-green-500  text-green-500 font-semibold"
                    onClick={onSubmitClick}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
