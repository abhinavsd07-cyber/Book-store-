import React, { useState } from "react";
import { addBook } from "../services/allAPI";
import { toast } from "react-toastify";

const SellBook = () => {
  const [preview, setPreview] = useState(
    "https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-1.gif"
  );

  const [previewArray, setPreviewArray] = useState([]);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    noOfPages: 0,
    imgURL: "",
    price: 0,
    discountPrice: 0,
    abstract: "",
    publisher: "",
    language: "",
    ISBN: "",
    category: "",
    uploadedImages: [],
  });

  const onImageClick = (e) => {
    console.log(e.target.files[0]);

    setBookData({
      ...bookData,
      uploadedImages: [...bookData.uploadedImages, e.target.files[0]],
    });

    let imgURL = URL.createObjectURL(e.target.files[0]);
    console.log(imgURL);
    setPreview(imgURL);
    setPreviewArray([...previewArray, imgURL]);
  };

  const onClickAddBook = async () => {
    try {
      let token = localStorage.getItem("token");

      let headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      let reqBody = new FormData();

      for (let key in bookData) {
        if (key != "uploadedImages") {
          reqBody.append(key, bookData[key]);
        } else {
          bookData.uploadedImages.forEach((eachFile) => {
            reqBody.append("uploadedImages", eachFile);
          });
        }
      }

      let apiResponse = await addBook(reqBody, headers);

      if (apiResponse.status == 201) {
        toast.success("Book Added");
        setBookData({
          title: "",
          author: "",
          noOfPages: 0,
          imgURL: "",
          price: 0,
          discountPrice: 0,
          abstract: "",
          publisher: "",
          language: "",
          ISBN: "",
          category: "",
          uploadedImages: [],
        });
        setPreview("");
        setPreviewArray("");
      } else {
        toast.error("Somthing went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  return (
    <div className="bg-neutral-300 p-10 mx-10 my-15 rounded-2xl">
      <h1 className="text-3xl font-bold text-center">Book Details</h1>
      <div className="flex justify-center gap-10 mt-10 flex-wrap ">
        <div className="flex flex-col justify-start items-center md:w-auto w-full">
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-full rounded-xl"
            placeholder="Title"
            value={bookData.title}
            onChange={(e) =>
              setBookData({ ...bookData, title: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-full rounded-xl"
            placeholder="Author"
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-full rounded-xl"
            placeholder="No of pages"
            // value={bookData.noOfPages}
            onChange={(e) =>
              setBookData({ ...bookData, noOfPages: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-full rounded-xl"
            placeholder="Image Url"
            value={bookData.imgURL}
            onChange={(e) =>
              setBookData({ ...bookData, imgURL: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-full rounded-xl"
            placeholder="Price"
            // value={bookData.price}
            onChange={(e) =>
              setBookData({ ...bookData, price: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-full rounded-xl"
            placeholder="Discount price"
            // value={bookData.discountPrice}
            onChange={(e) =>
              setBookData({ ...bookData, discountPrice: e.target.value })
            }
          />
          <textarea
            name=""
            id=""
            placeholder="Abstract"
            className="bg-white px-3 py-2 mt-2 w-100 rounded-xl h-30"
            value={bookData.abstract}
            onChange={(e) =>
              setBookData({ ...bookData, abstract: e.target.value })
            }
          ></textarea>
        </div>

        <div className="flex flex-col justify-start items-center md:w-auto w-full">
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-100 rounded-xl"
            placeholder="Publisher"
            value={bookData.publisher}
            onChange={(e) =>
              setBookData({ ...bookData, publisher: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-100 rounded-xl"
            placeholder="Language"
            value={bookData.language}
            onChange={(e) =>
              setBookData({ ...bookData, language: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-100 rounded-xl"
            placeholder="ISBN"
            value={bookData.ISBN}
            onChange={(e) => setBookData({ ...bookData, ISBN: e.target.value })}
          />
          <input
            type="text"
            className="bg-white px-3 py-2 m-2 w-100 rounded-xl"
            placeholder="Category"
            value={bookData.category}
            onChange={(e) =>
              setBookData({ ...bookData, category: e.target.value })
            }
          />

          <label htmlFor="imgUpload">
            <input
              type="file"
              name=""
              id="imgUpload"
              className="hidden"
              onChange={(e) => onImageClick(e)}
            />
            <img
              src={preview}
              alt=""
              className="h-50 my-5 cursor-pointer rounded-xl"
            />
          </label>

          {previewArray.length > 0 && (
            <div className="flex gap-5">
              {previewArray.map((eachImg) => (
                <img src={eachImg} alt="" className="h-10 rounded-lg" />
              ))}
              {previewArray.length < 3 && (
                <label htmlFor="plus">
                  <input
                    type="file"
                    name=""
                    id="plus"
                    className="hidden"
                    onChange={(e) => onImageClick(e)}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2040/2040520.png"
                    alt=""
                    className="w-10 "
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="text-center mt-10">
        <button
          onClick={onClickAddBook}
          className="px-3 py-2 bg-blue-500/40 border rounded-lg border-blue-500 cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SellBook;
