import useSWR from "swr";
import { fetcher } from "../api/api";
import { GET_ROOM_BY_ID_URL as url } from "../api/roomsApi";
import { Room, Team } from "../models";
import { SocketContext } from "../context/socket";
import { useContext, useEffect, useCallback, useMemo, useReducer } from "react";
import { useRouter } from "next/router";
import { leaveRoom as userLeaveRoom } from "../api/userApi";
import useUser from "./useUser";

function reducer(
  state: Room,
  action:
    | { payload: Room; type: "update" }
    | { payload: { teamId: string; topGuess: { score: number; rank: number } }; type: "add" }
) {
  switch (action.type) {
    case "add":
      const teamToUpdate = state.teams.find(({ id }) => id === action.payload.teamId);
      const updatedTeams = [
        ...state.teams.filter(({ id }) => id !== teamToUpdate?.id),
        { ...teamToUpdate, topGuess: action.payload.topGuess },
      ];
      updatedTeams.sort((team, otherTeam) => otherTeam.topGuess.score - team.topGuess.score);
      return {
        ...state,
        teams: updatedTeams,
      } as Room;
    case "update":
      return action.payload;
    default:
      throw new Error();
  }
}

export const useRoom = (id: string) => {
  const { data, error, mutate } = useSWR(id ? [url, id] : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const socket = useContext(SocketContext);
  const router = useRouter();
  const [room, dispatch] = useReducer(reducer, {} as Room);
  const isLoading = !room?.id && !error;
  const { user } = useUser();

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    dispatch({ payload: data, type: "update" });
  }, [data]);

  useEffect(() => {
    const update = (payload: { teamId: string; topGuess: { score: number; rank: number } }) => {
      dispatch({ payload, type: "add" });
    };

    socket.on("topGuessUpdate", update);

    return () => {
      socket.removeListener("topGuessUpdate", update);
    };
  }, [socket]);

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

  const leaveRoom = useCallback(async () => {
    await userLeaveRoom({ roomId: room.id, userId: user.id, socketId: socket.id });
    socket.emit("leaveRoom", room.id);
    router.push("/");
  }, [room?.id, router, socket, user.id]);

  const participantCount = useMemo(
    () =>
      room.id
        ? (room?.teams as Team[]).reduce((participantCount, team) => {
            return participantCount + (team._count?.members ?? 0);
          }, 0)
        : 0,
    [room?.teams, room?.id]
  );

  useEffect(() => {
    const handler = () => {
      leaveRoom().catch((_e) => {
        //
      });
    };

    window.onpopstate = handler;
  }, [leaveRoom]);

  return {
    room: room as Room,
    isLoading,
    isError: error as Error,
    leaveRoom,
    participantCount,
  };
};
