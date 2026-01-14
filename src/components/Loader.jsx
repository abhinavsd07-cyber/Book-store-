import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loading from "../assets/Book Paging Loading.lottie?url";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <DotLottieReact src={loading} loop autoplay  className="h-80"/>
    </div>
  );
};

export default Loader;
