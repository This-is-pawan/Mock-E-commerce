import React from "react";
import img from "../assets/home.svg";

const Home = () => {
  const user = "";

  return (
    <div
      className="relative flex items-center justify-center w-full h-[80vh] md:h-screen mt-8 bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-20 md:bg-opacity-30"></div>

      {/* Content */}
      <div className="relative text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-100 drop-shadow-xl">
          Welcome to our website{" "}
          <span className="text-pink-400 capitalize">
            {user || "example"}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Home;
