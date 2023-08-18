import React, { useState } from "react";
import RegistrationBlock from "../components/LandingPage/RegistrationBlock";
import heroCard from "../assets/heroCard.png";
import LandingFeatures from "../components/LandingPage/LandingFeatures";

const LandingPage = () => {
  return (
    <div className="">
      <div className="flex flex-row justify-center items-center gap-12 px-20">
        <div className="w-1/2 flex flex-col justify-center items-start gap-5 h-screen">
          <p className="text-5xl w-2/3 text-slate-200 leading-tight">
            Welcome to{" "}
            <span className="font-bold font-starwars tracking-widest text-[#FFDF00]">
              JediCode
            </span> <br />
            the ultimate coding experience with a twist
          </p>
          <img src={heroCard} />
        </div>

        <RegistrationBlock />
      </div>

      <div className="mt-20 flex flex-row justify-center items-center pb-40 gap-20 px-8">
        <LandingFeatures />
        <LandingFeatures />
        <LandingFeatures />
      </div>
    </div>
  );
};

export default LandingPage;
