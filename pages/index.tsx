import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/socket";
import Title from "../components/title";
import Rooms from "../components/rooms";
import CreateRoom from "../components/createRoom";
import { GET_ALL_ROOMS_URL as url } from "../api/roomsApi";
import { fetcher } from "../api/api";
import useSWR from "swr";
import Script from "next/script";

const Lobby: NextPage = () => {
  const socket = useContext(SocketContext);
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      <Title>Lobby</Title>
      <CreateRoom />
      <Rooms rooms={rooms} />
    </main>
  );
};

export default Lobby;
