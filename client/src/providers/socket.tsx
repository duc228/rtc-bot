import React, { useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import socket from "../configs/socket";

type SocketProviderProps = {};

const SocketProvider = ({}: SocketProviderProps) => {
  if (!window["WebSocket"]) {
    alert("Error: Your browser does not support web sockets.");
  }
  const { user } = useAuthStore();
  // useEffect(() => {
  //   console.log("start ws");
  //   socket.onopen = (evt) => {
  //     console.log("Connection open...", evt);
  //     socket.send("Hello WebSockets!");
  //   };

  //   socket.onmessage = function (evt) {
  //     console.log("Received Message: " + evt.data);
  //   };
  //   //Triggered when the connection is closed
  //   socket.onclose = function (evt) {
  //     console.log("Connection closed.");
  //   };
  // }, [user?.id]);
  return <></>;
};

export default SocketProvider;
