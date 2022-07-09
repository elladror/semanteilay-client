import useSWR from "swr";
import { Room } from "../models";
import { GET_ALL_ROOMS_URL as url } from "../api/roomsApi";
import { fetcher } from "../api/api";
import { SocketContext } from "../context/socket";
import { useContext, useEffect } from "react";

export const useRooms = () => {
    const { data, error, mutate } = useSWR(url, fetcher);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('roomsUpdated', mutate)
        
        return () => {
            socket.removeAllListeners();
        }
    }, [mutate, socket])



    return {
      rooms: data as Room[],
      isLoading: !error && !data,
      isError: error as Error,
    };
  };
  
