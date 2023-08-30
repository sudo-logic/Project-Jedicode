import axios from "axios";
import { proxy, subscribe } from "valtio";

const token = localStorage.getItem("token");

// const fetchProfile = async () => {
//   return await axios.get(`/auth/profile`).then((res) => res.data);
// };

const globalStateInit = {
  profile: {},
  languageId: 1,
  room: {},
  submissions: {},
  questionId: "",
  selected: {},
  questionTime: {},
  clients: 1
  // startTime: null,
  // endTime: null,
  // submitted: false,
};

export const globalState = proxy(
  JSON.parse(localStorage.getItem("state_obj_store")) || globalStateInit
);

export const reset = () => {
  Object.keys(globalStateInit).forEach((key) => {
    globalState[key] = globalStateInit[key];
  });
};

export const updateProfile = async () => {
  // return await axios.get(`/auth/profile`).then((res) => res.data);
  reset();
  globalState.profile = await axios
    .get(`/auth/profile`)
    .then((res) => res.data);
};

const unsubscribe = subscribe(globalState, () =>
  console.log("globalState has changed to", globalState)
);

subscribe(globalState, () => {
  localStorage.setItem("state_obj_store", JSON.stringify(globalState));
});
