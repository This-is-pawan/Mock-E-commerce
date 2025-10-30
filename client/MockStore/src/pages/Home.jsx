import React from "react";
import img from "../assets/home.svg";

const Home = () => {
  const user = "";

  return (
   <div
  className="w-full h-[80vh] min-[800px]:h-screen bg-cover bg-center bg-no-repeat opacity-95 flex items-center justify-center mt-8"
  style={{ backgroundImage: `url(${img})` }}
>
  <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg text-pink-900">
    Welcome to our website <span className="text-pink-200 capitalize">{user || "example"}</span>
  </h1>
</div>


  );
};

export default Home;
