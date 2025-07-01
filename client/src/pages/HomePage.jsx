import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState({ username: false, roomId: false });
  const navigate = useNavigate();

  const generateRoomId = () => {
    setRoomId(uuidv4);
    toast.success("Room ID generated");
  };

  const joinRoom = (e) => {
    e.preventDefault();
    const newError = {
      username: username.trim().length === 0,
      roomId: roomId.trim().length === 0,
    };
    if (!username || !roomId) {
      toast.error("Please enter all the fields.");
      setError(newError);
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-gray-400 border-4 h-3/4 w-11/12 md:h-3/4 md:w-1/2">
        <div className="px-4 py-4">
          <img src={Logo} alt="Logo" className="mx-auto h-16" />
        </div>
        <div className="flex justify-center items-center flex-col gap-3 xl:gap-4">
          <h1 className="text-light text-xl md:text-3xl">Enter the ROOM ID</h1>
          <form className="flex justify-center items-center flex-col w-11/12 gap-5 xl:gap-8 mt-4 mb-6">
            <div className="w-full">
              <input
                type="text"
                className="border border-gray-200 bg-light w-full h-10 px-4 py-1 rounded-md"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error.username && (
                <label className="my-2 text-red-500">
                  Username cannot be empty!
                </label>
              )}
            </div>
            <div className="w-full">
              <input
                type="text"
                className="border border-gray-200 bg-light w-full h-10 px-4 py-1 rounded-md"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              {error.roomId && (
                <label className="my-2 text-red-500">
                  Room ID cannot be empty!
                </label>
              )}
            </div>
            <button
              className="bg-green-600 h-10 px-4 py-2 rounded-sm hover:bg-green-400"
              onClick={joinRoom}
            >
              Join
            </button>
          </form>
          <p className="text-light">
            Don't have a room ID?{" "}
            <br className="md:hidden" />
            <span
              className="text-green-500 underline flex justify-center hover:text-green-300 hover:cursor-pointer"
              onClick={generateRoomId}
            >
              Create New Room
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
