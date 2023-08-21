import axios from "axios";
import { proxy, subscribe } from "valtio";

const token = localStorage.getItem("token");

const fetchProfile = async () => {
  return await axios.get(`/auth/profile`).then((res) => res.data);
};

export const globalState = proxy(
  JSON.parse(localStorage.getItem("foo")) || {
    profile: fetchProfile(),
    languageId: 1,
    room: {},
  }
);

// const unsubscribe = subscribe(globalState, () =>
//   console.log("globalState has changed to", globalState)
// );

subscribe(globalState, () => {
  localStorage.setItem("foo", JSON.stringify(globalState));
});
