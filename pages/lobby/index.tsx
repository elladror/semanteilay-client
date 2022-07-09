import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import styles from "./lobby.module.css";
import { SocketContext } from "../../context/socket";
import Title from "../../components/title";
import Rooms from "../../components/rooms";
import CreateRoom from "../../components/createRoom";
import useUser from "../../hooks/useUser";

const Lobby: NextPage = () => {
  const socket = useContext(SocketContext);
  const { user } = useUser();

  useEffect(() => {
    socket.emit("joinLobby");
  }, [socket]);

  return (
    <main>
      <Title>Lobby</Title>
      <CreateRoom user={user}/>
      <Rooms />
    </main>
  );
};

export default Lobby;
