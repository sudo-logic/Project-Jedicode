import axios from "axios";
import { proxy } from "valtio";

const token = localStorage.getItem("token");

const fetchProfile = async () => {
  return await axios.get(`/auth/profile`).then((res) => res.data);
};

const fetchQuestions = async () => {
  return await axios.get(`/questions`).then((res) => res.data);
};

const fetchLanguages = async () => {
  return await axios
    .get(`https://ce.judge0.com/languages/all`)
    .then((res) => res.data);
};

export const globalState = proxy({
  profile: fetchProfile(),
  languages: fetchLanguages(),
  languageId: 1,
  room: {},
});
