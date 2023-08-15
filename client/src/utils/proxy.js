import { useState } from "react";
import { proxy } from "valtio";

const token = localStorage.getItem("token")

const fetchProfile = async () => {
  const data = await fetch(`http://34.100.255.183/auth/profile`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }) || "";

  return data.json()
}

const fetchQuestions = async () => {
  const data = await fetch("http://34.100.255.183/questions");
  return data.json();
};

export const globalState = proxy({
  questions: fetchQuestions(),
  profile: fetchProfile()
});
