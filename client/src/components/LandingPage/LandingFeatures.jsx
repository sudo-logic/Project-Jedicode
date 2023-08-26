import React from "react";
import spaceship from "../../assets/spaceship.png"
import featureFooter from "../../assets/featureFooter.png"

const LandingFeatures = ({heading, paragraph}) => {
  return (
    <div className="overflow-hidden text-center bg-black rounded shadow-[0_0_20px_#C90E10] text-slate-500 border border-slate-200">
      <div className="p-6 flex flex-col justify-center items-center gap-4">
        <h3 className="text-3xl font-medium text-white font-starwars text-center">
          {heading}
        </h3>
        <img src={spaceship} className="w-60" />
        <p className="text-left mt-4 text-slate-200">
          {paragraph}
        </p>
        <img src={featureFooter} className="w-10 self-end" />
      </div>
    </div>
  );
};

export default LandingFeatures;

// import React from "react"

// export default function CardIcon() {
//   return (
//     <>
//       {/*<!-- Component: Card with icon --> */}
//       <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200">
//         <div className="p-6">
//           <h3 className="mb-4 text-xl font-medium text-slate-700">Bonus</h3>
//           <p>
//             All components come with proper attributes to ensure full
//             accessibility with the WAI-ARIA standards. Web accessibility means
//             that websites, tools, and technologies are designed and developed so
//             that people with disabilities can use them.
//           </p>
//         </div>
//       </div>
//       {/*<!-- End Card with icon --> */}
//     </>
//   )
// }
