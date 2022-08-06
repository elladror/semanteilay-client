import socketio from "socket.io-client";
import React from "react";

export const socket = socketio(
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_SOCKET_URL as string) ?? "http://localhost:9000"
    : ""
); // socket id is not the same as user id
export const SocketContext = React.createContext(socket);
