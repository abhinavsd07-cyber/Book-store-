import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getAllBooks } from "../services/allAPI";
import { toast } from "react-toastify";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext";

const Book = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [copyBookData, setCopyBookData] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  let { token } = useContext(authContext);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      getBooksData();
    }
  }, [searchKey]);

  const getBooksData = async () => {
    try {
      // let token = localStorage.getItem("token");
      console.log(token);
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllBooks(header, searchKey);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.bookData);
        setCopyBookData(apiResponse.data.bookData);

        let category = [];
        apiResponse.data.bookData.forEach((eachCategory) => {
          if (!category.includes(eachCategory.category)) {
            category.push(eachCategory.category);
          }
        });
        // console.log(category);
        setAllCategory(category);

        // console.log(apiResponse.data.bookData);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterByCategory = (category) => {
    let filteredBook = copyBookData.filter(
      (eachbook) => eachbook.category == category
    );
    setBookData(filteredBook);
  };

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <>
          <div className="p-5 text-center">
            <h1 className="text-3xl font-semibold m-5">Collections</h1>

            <div className="flex flex-col md:flex-row justify-center items-center">
              <input
                type="text"
                className="border border-neutral-300 px-3 py-2 rounded-lg md:rounded-l-lg md:rounded-r-none w-full md:w-96"
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
              />
              <button className="border border-neutral-300 px-6 py-2 rounded-lg md:rounded-r-lg md:rounded-l-none bg-blue-600 text-white font-semibold w-full md:w-auto">
                Search
              </button>
            </div>
          </div>
          <div className="grid grid-cols-12 my-10">
            <div className="col-span-12 md:col-span-2 p-8">
              <h2 className="text-2xl font-semibold text-center md:text-left">
                Filters
              </h2>

              <div className="mt-4">
                <div className="mb-1">
                  <input
                    type="radio"
                    id="all"
                    className="mr-2"
                    name="category"
                    onClick={getBooksData}
                  />
                  <label htmlFor="all" className="font-semibold">
                    All
                  </label>
                </div>
                {allCategory?.length > 0 && (
                  <div className="flex flex-col gap-2 items-start md:items-start">
                    {allCategory.map((eachCategory, index) => (
                      <div
                        key={index}
                        className="flex items-center"
                        onClick={() => filterByCategory(eachCategory)}
                      >
                        <input
                          type="radio"
                          id={eachCategory}
                          className="mr-2"
                          name="category"
                        />
                        <label htmlFor={eachCategory} className="font-semibold">
                          {eachCategory}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {bookData?.length > 0 ? (
              <div className="col-span-12 md:col-span-10 p-5">
                <div className="flex flex-col md:flex-row md:flex-wrap gap-5 justify-center md:justify-start">
                  {bookData.map((eachBook, index) => (
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
                      <Link
                        to={`/view/${eachBook._id}/book`}
                        className="bg-blue-500 px-3 py-1 rounded-2xl text-white font-semibold mt-3"
                      >
                        View More
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-span-12 text-center text-xl font-semibold">
                No Book added
              </div>
            )}
          </div>
        </>
      ) : (
        // <div className="h-screen flex items-center justify-center text-4xl font-bold">
        //   Please
        //   <Link className="mx-2 text-blue-600" to={"/login"}>
        //     Login
        //   </Link>
        // </div>
        <Auth />
      )}

      <Footer />
    </>
  );
};

export default Book;
