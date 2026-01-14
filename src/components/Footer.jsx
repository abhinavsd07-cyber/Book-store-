import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <footer className="border p-10 bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-slate-200">
            <h4 className="text-lg font-semibold mb-3">ABOUT US</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Cupiditate dolorem veniam deserunt quisquam eius ad hic maxime
              dicta ipsum nemo itaque necessitatibus quas nobis, illum
              voluptate, pariatur recusandae alias harum!
            </p>
          </div>
          <div className="text-slate-200">
            <h4 className="text-lg font-semibold mb-3">NEWS LETTER</h4>
            <p>Stay updated with our latest trends</p>

            <input
              type="email"
              placeholder="Email ID"
              className="bg-slate-100 placeholder:text-slate-700 mt-4 px-3 py-2 rounded-s-xl w-75"
            />
            <button className="bg-yellow-300 text-slate-800 px-3 py-2 rounded-e-xl">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="text-slate-200">
            <h4 className="text-lg font-semibold mb-3">FOLLOW US</h4>
            <p>Let us be social</p>
            <div className="flex gap-3 mt-4">
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
            </div>
          </div>
        </div>
      </footer>
      <div className="p-4 bg-black text-slate-500 text-center">
        Copyright © 2025 All rights reserved | This website is developed by
        <a
          href="https://www.linkedin.com/in/shahanvsaleem"
          target="_blank"
          className="text-yellow-300 mx-1"
        >
          shahan.sv
        </a>
      </div>
    </>
  );
};

export default Footer;
