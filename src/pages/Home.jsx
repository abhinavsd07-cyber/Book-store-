import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { getLimitedBook } from "../services/allAPI";

const Home = () => {
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    getBookData();
  }, []);

  const getBookData = async () => {
    try {
      let apiResponse = await getLimitedBook();
      // console.log(apiResponse);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.sampleBookData);
      } else {
        setBookData(apiResponse.response.data.response);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while book data");
    }
  };

  return (
    <>
      <Header />
      <section id="home-bg-img" className="h-125 relative">
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-slate-800/40">
          <h2 className="text-white font-semibold text-6xl">Wonderful Gifts</h2>
          <p className="text-white font-semibold">
            Give your family and friends a book
          </p>

          <input
            type="text"
            placeholder="Search Books"
            className="bg-white mt-15 rounded-full py-2 px-4 w-100 focus:outline-slate-700  "
          />
        </div>
      </section>
      <section className="w-full py-12">
        <div className="flex flex-col justify-center items-center mb-10 px-4 text-center">
          <h2 className="text-lg font-semibold tracking-wide">NEW ARRIVALS</h2>
          <h3 className="text-3xl font-semibold mt-2">
            Explore Our Latest Collection
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-24 text-center">
          {bookData?.map((eachBook, index) => (
            <div key={index + 1}>
              <div className="rounded-2xl bg-white p-4 shadow-xl border border-slate-200 flex flex-col items-center hover:shadow-2xl transition-shadow">
                <img
                  src={eachBook.imgURL}
                  alt={eachBook.title}
                  className="w-48 h-64 object-cover rounded-md shadow"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-bold  w-40">{eachBook.title}</h3>
                  <p className="text-gray-700 w-40 mt-1">{eachBook.author}</p>
                  <p className="text-black font-semibold mt-3">
                    Rs {eachBook.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center m-10">
          <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg">
            Explore More
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 lg:px-24 mb-20">
        <div className="p-3">
          <div className="my-6">
            <h2 className="text-lg text-center">FEATURED AUTHORS</h2>
            <h3 className="text-2xl text-center font-semibold ">
              Captivates with every word
            </h3>
          </div>
          <p className="m-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
            laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
            Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sunt earum possimus accusantium necessitatibus id neque soluta
            quibusdam explicabo laborum? Deserunt vel quia voluptates dicta
            incidunt illo fuga pariatur sequi error.
          </p>
          <p className="m-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
            laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
            Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sunt earum possimus accusantium necessitatibus id neque soluta
            quibusdam explicabo laborum? Deserunt vel quia voluptates dicta
            incidunt illo fuga pariatur sequi error.
          </p>
        </div>

        <img
          src="https://img.freepik.com/premium-photo/woman-isolated-background_1368-333606.jpg"
          alt=""
          className="h-110 w-full object-cover object-top rounded-xl"
        />
      </section>
      <section className="mt-10">
        <h2 className="text-center text-lg">TESTIMONIALS</h2>
        <h3 className="text-2xl text-center font-semibold">
          See What Others Are Saying
        </h3>

        <div className="flex justify-center mt-10">
          <img
            src="https://www.shutterstock.com/image-photo/headshot-portrait-happy-middle-aged-260nw-2423464813.jpg"
            alt=""
            className="h-44 w-44 object-cover  rounded-full"
          />
        </div>
        <h5 className="text-center m-3 font-semibold"> Joseph</h5>
        <p className="px-6 lg:px-24 mb-10">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
          perspiciatis porro eveniet. Optio necessitatibus provident autem, quam
          qui, dicta molestiae quis quia deleniti aliquam magnam temporibus
          mollitia ex repellendus! Dicta. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consequuntur, deserunt optio eum dolorum iure
          consectetur quia facilis porro modi placeat ea quis explicabo maxime
          voluptatum unde animi nemo aperiam quos!
        </p>
      </section>
      <Footer />
    </>
  );
};

export default Home;
