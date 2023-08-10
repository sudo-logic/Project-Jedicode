import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": false,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  return io(import.meta.env.VITE_BASE_URL, options);
};
