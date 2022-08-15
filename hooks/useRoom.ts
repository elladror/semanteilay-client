import useSWR from "swr";
import { fetcher } from "../api/api";
import { GET_ROOM_BY_ID_URL as url } from "../api/roomsApi";
import { Room, Team } from "../models";
import { SocketContext } from "../context/socket";
import { useContext, useEffect, useCallback, useMemo, useReducer } from "react";
import { useRouter } from "next/router";

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
  const { data, error, mutate } = useSWR([url, id], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const socket = useContext(SocketContext);
  const router = useRouter();
  const [room, dispatch] = useReducer(reducer, {} as Room);
  const isLoading = !room?.id && !error;

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    dispatch({ payload: data, type: "update" });
  }, [data]);

  useEffect(() => {
    if (room.id) {
      socket.emit("joinRoom", room);

      return () => {
        socket.emit("leaveRoom", room);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, socket]); // happens once after the data

  useEffect(() => {
    const update = (payload: { teamId: string; topGuess: { score: number; rank: number } }) => {
      dispatch({ payload, type: "add" });
      console.log(room);
    };

    socket.on("topGuessUpdate", update);

    return () => {
      socket.removeListener("topGuessUpdate", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function leaveRoom() {
    router.push("/lobby");
  }

  const participantCount = useMemo(
    () =>
      room.id
        ? (room?.teams as Team[]).reduce((participantCount, team) => {
            return participantCount + (team._count?.members ?? 0);
          }, 0)
        : 0,
    [room?.teams, room?.id]
  );

  return {
    room: room as Room,
    isLoading,
    isError: error as Error,
    leaveRoom,
    participantCount,
  };
};
