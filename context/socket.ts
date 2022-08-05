import socketio from "socket.io-client";
import React from "react";

export const socket = socketio(
  typeof window !== "undefined" ? (process.env.SOCKET_URL as string) : ""
); // socket id is not the same as user id
export const SocketContext = React.createContext(socket);
