import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import Client from "./Client";

const Sidebar = ({clients}) => {

  return (
    <div className="text-light h-full">
      <div className="my-4">
        <img src={Logo} alt="Logo" className="mx-auto h-10" />
      </div>
      <hr className="w-3/4 mx-auto" />
      <div className="h-8/12">
        {clients.map((client)=>(
            <div className="mt-5" key={client.socketId}>
                <Client socketId={client.socketId} username={client.username}/>
            </div>
        ))}
      </div>
      <div className="flex justify-center items-center flex-col mt-3 gap-2">
        <button className="bg-green-700 px-2 py-1 w-6/12 rounded-sm hover:cursor-pointer hover:bg-green-600">Copy Room ID</button>
        <button className="bg-red-600 px-2 py-1 w-6/12 rounded-sm hover:cursor-pointer hover:bg-red-500">Leave Room</button>
      </div>
    </div>
  );
};

export default Sidebar;
