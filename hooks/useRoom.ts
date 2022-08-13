import useSWR from "swr";
import { fetcher } from "../api/api";
import { GET_ROOM_BY_ID_URL as url } from "../api/roomsApi";
import { Room } from "../models";
import { SocketContext } from "../context/socket";
import { useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

export const useRoom = (id: string) => {
  const {
    data: room,
    error,
    mutate,
  } = useSWR([url, id], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const socket = useContext(SocketContext);
  const isLoading = !room && !error;
  const router = useRouter();

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

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
    socket.on("participantUpdate", refetch);

    return () => {
      socket.removeListener("participantUpdate", refetch);
    };
  }, [refetch, socket]);

  useEffect(() => {
    socket.on("teamDeleted", refetch);

    return () => {
      socket.removeListener("teamDeleted", refetch);
    };
  }, [refetch, socket]);

  function leaveRoom() {
    router.push("/lobby");
  }

  return {
    room: room as Room,
    isLoading,
    isError: error as Error,
    leaveRoom,
  };
};
