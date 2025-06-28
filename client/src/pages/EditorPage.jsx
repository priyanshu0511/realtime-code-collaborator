import React, { useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { initSocket } from "../socket";
import { useState } from "react";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (location.state?.username) {
      toast.success(`Room joined as ${location.state.username}`);
    }
    const init = async () => {
      const handleErr = (err) => {
        console.log("Socket Error => ", err);
        toast.error("Socket Connection Failed.");
        navigate("/");
      };

      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => {
        handleErr(err);
      });
      socketRef.current.on("connect_failed", (err) => {
        handleErr(err);
      });

      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} has joined.`);
        }
        setClients(clients);
      });

      //Disconnected-
      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off("joined");
        socketRef.current.off("disconnected");
      }
    };
  }, [location.state]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-900">
        <Sidebar clients={clients} />
      </div>
      <div className="w-4/5">
        <CodeEditor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
};

export default EditorPage;
