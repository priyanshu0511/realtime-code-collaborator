import { io } from "socket.io-client";

export const initSocket = async () => {

   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    await fetch (BACKEND_URL,{cache:'no-store'})
  } catch (error) {
    throw error;
  }

  const option = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };
  return io(import.meta.env.VITE_BACKEND_URL, option);
};
