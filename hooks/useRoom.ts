import useSWR from "swr";
import { fetcher } from "../api/api";
import { GET_ROOM_BY_ID_URL as url } from "../api/roomsApi";
import { Room } from "../models";
import { SocketContext } from "../context/socket";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

export const useRoom = (id: string) => {
  const {
    data: room,
    error,
    mutate,
  } = useSWR([url, id], fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
  });
  const socket = useContext(SocketContext);
  const isLoading = !room && !error;
  const router = useRouter();

  useEffect(() => {
    if (room) {
      socket.emit("joinRoom", room);

      return () => {
        socket.emit("leaveRoom", room);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, socket]); // happens once after the data

  useEffect(() => {
    socket.on("participantUpdate", mutate);

    return () => {
      socket.removeListener("participantUpdate", mutate);
    };
  }, [mutate, socket]);

  function leaveRoom() {
    router.push('/lobby');
  }

  return {
    room: room as Room,
    isLoading,
    isError: error as Error,
    updateRoom: mutate,
    leaveRoom,
  };
};