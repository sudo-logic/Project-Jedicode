import React from "react";
import ResultTable from "../components/Tables/ResultTable";
import { useNavigate } from "react-router-dom";

const IntermediateResult = () => {

  const navigate = useNavigate()

  return (
    <div>
      <p className="mb-20">
        Your test has ended! However, other people are still participating in
        the competition. So you can either wait here or navigate to dashboard to
        participate in more exciting battles.
      </p>

      <ResultTable />

      <button className="flex flex-row justify-center items-center gap-5 mt-20 p-3 text-white rounded-md bg-[#212121] hover:bg-[#414141] transition-colors" onClick={() => navigate("/dashboard")}>
        Navigate to Dashboard
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default IntermediateResult;
