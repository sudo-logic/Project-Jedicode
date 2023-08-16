import { proxy } from "valtio";

const token = localStorage.getItem("token")

const fetchProfile = async () => {
  const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }) || "";

  return data.json()
}

const fetchQuestions = async () => {
  const data = await fetch("https://34.100.255.183/questions");
  return data.json();
};

export const globalState = proxy({
  questions: fetchQuestions(),
  profile: fetchProfile(),
  apiURI: import.meta.env.VITE_BACKEND_URL
});
