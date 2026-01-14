import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { Edit, SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import { updateProfile } from "../services/allAPI";

const EditProfile = ({ userDetails }) => {
  const [openModal, setOpenModal] = useState(false);

  const [editData, setEditData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    bio: "",
    profilePhoto: "",
  });

  useEffect(() => {
    setEditData(userDetails);
  }, [userDetails]);

  const [previewImage, setPreviewImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );

  const onImageChange = (e) => {
    console.log(e)
    console.log(e.target.files[0]);
    let url = URL.createObjectURL(e.target.files[0]);
    setEditData({ ...editData, profilePhoto: e.target.files[0] });
    console.log(url);
    setPreviewImage(url);
  };

  const onEditProfie = async () => {
    try {
      if (
        editData.userName == "" ||
        editData.bio == "" ||
        editData.password == "" ||
        editData.confirmPassword == "" ||
        editData.profilePhoto == ""
      ) {
        toast.error("Please fill the form");
      } else {
        if (editData.password == editData.confirmPassword) {
          let token = localStorage.getItem("token");
          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };

          let reqBody = new FormData();

          for (let key in editData) {
            reqBody.append(key, editData[key]);
          }
          let apiResponse = await updateProfile(editData._id, reqBody, header);

          if ((apiResponse.status = 200)) {
            toast.success(apiResponse.data.message);
          } else {
            toast.error(apiResponse.response.data.message);
          }
        } else {
          toast.error("Confirm password does not match with password ");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div>
      <button
        className="border border-blue-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-700 hover:text-white flex"
        onClick={() => setOpenModal(true)}
      >
        <SquarePen className="mr-2 " />
        Edit profile
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="bg-black/50 pt-40 px-60"
      >
        <ModalHeader className="bg-zinc-900  text-white">
          Edit Profile
        </ModalHeader>
        <ModalBody className="bg-zinc-900  text-white">
          <div className="space-y-6 flex justify-center flex-col items-center">
            <label
              htmlFor="img"
              className="flex justify-center flex-col items-center"
            >
              <input
                type="file"
                name=""
                id="img"
                onChange={(e) => onImageChange(e)}
                className="text-zinc-900"
              />
              <img src={previewImage} alt="" className="w-30" />
            </label>

            <input
              type="text"
              placeholder="Username"
              className="w-75 bg-white placeholder:text-neutral-700 px-3 py-2 rounded-lg text-black"
              onChange={(e) =>
                setEditData({ ...editData, userName: e.target.value })
              }
              value={editData.userName}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-75 bg-white placeholder:text-neutral-700 px-3 py-2 rounded-lg text-black"
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
              value={editData.password}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-75 bg-white placeholder:text-neutral-700 px-3 py-2 rounded-lg text-black"
              onChange={(e) =>
                setEditData({ ...editData, confirmPassword: e.target.value })
              }
            />
            <textarea
              name="bio"
              id=""
              placeholder="Bio"
              className="w-75 bg-white placeholder:text-neutral-700 px-3 py-2 rounded-lg text-black mb-2"
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
              }
              value={editData.bio}
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter className="bg-zinc-900  text-white flex justify-end">
          <Button
            onClick={() => setOpenModal(false)}
            className="bg-zinc-500 px-3 py-2 cursor-pointer"
          >
            Close
          </Button>
          <Button
            onClick={onEditProfie}
            className="bg-blue-500 m-3 px-3 py-2 cursor-pointer"
          >
            <Edit className="h-5 mr-1" />
            Edit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProfile;
