import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/socket";
import Title from "../../components/title";
import Rooms from "../../components/rooms";
import CreateRoom from "../../components/createRoom";
import useUser from "../../hooks/useUser";
import { GET_ALL_ROOMS_URL as url } from "../../api/roomsApi";
import { fetcher } from "../../api/api";
import useSWR from "swr";

const Lobby: NextPage = () => {
  const socket = useContext(SocketContext);
  const { user, changeTeam } = useUser();
  const { data: rooms, mutate } = useSWR(url, fetcher);

  useEffect(() => {
    socket.emit("joinLobby");
  }, [socket]);

  useEffect(() => {
    socket.on("roomsUpdated", mutate);

    return () => {
      socket.removeListener("roomsUpdated", mutate);
    };
  }, [mutate, socket]);

  // TODO: add isEror isLoading and skeleton

  return (
    <main>
      <Title>Lobby</Title>
      <CreateRoom user={user} changeTeam={changeTeam} />
      <Rooms rooms={rooms} user={user} changeTeam={changeTeam} />
    </main>
  );
};

export default Lobby;
