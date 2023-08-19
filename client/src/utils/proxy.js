import { proxy } from "valtio";

const token = localStorage.getItem("token");

const fetchProfile = async () => {
  const data =
    (await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })) || "";

  return data.json();
};

const fetchQuestions = async () => {
  const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/questions`);
  return data.json();
};

const fetchLanguages = async () => {
  const data = await fetch(`https://ce.judge0.com/languages/all`);
  return data.json();
};

export const globalState = proxy({
  questions: fetchQuestions(),
  profile: fetchProfile(),
  languages: fetchLanguages(),
  apiURI: import.meta.env.VITE_BACKEND_URL,
  languageId: 71
});
