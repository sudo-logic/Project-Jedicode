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
            </span>{" "}
            <br />
            the ultimate coding experience with a twist
          </p>
          <img src={heroCard} />
        </div>

        <RegistrationBlock />
      </div>

      <div className="mt-20 flex flex-row justify-center items-stretch mb-40 gap-20 px-8">
        <LandingFeatures
          heading="JediCode Arena"
          paragraph="Engage in epic coding duels. Challenge friends or rivals to head-to-head coding battles and see who emerges as the coding Jedi Master."
        />
        <LandingFeatures
          heading="Real-Time Leaderboard"
          paragraph="Rise through the ranks in real time! Witness your coding skills shine on the live leaderboard, showcasing your standing against fellow JediCode enthusiasts during heated battles."
        />
        <LandingFeatures
          heading="Dark Mode"
          paragraph="Stay comfortable during those late-night coding sessions. Our dark mode reduces eye strain and allows you to code with the power of the Force, day or night."
        />
      </div>
    </div>
  );
};

export default LandingPage;
