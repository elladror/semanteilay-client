import { useCallback, useContext, useEffect } from "react";
import useUser from "./useUser";
import { createNewTeam, leaveTeam as leaveTeamRequest, joinTeam } from "../api/teamsApi";
import { SocketContext } from "../context/socket";
import { Room } from "../models";

const useTeam = (room: Room) => {
  const { user, changeTeam, leaveTeam: setTeamEmpty } = useUser();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("kickFromTeam", setTeamEmpty);

    return () => {
      socket.removeListener("kickFromTeam", setTeamEmpty);
    };
  });

  const switchTeam = useCallback(
    async (newTeamId: string) => {
      if (user.teamId !== newTeamId) {
        if (user.teamId)
          await leaveTeamRequest({ userId: user.id, teamId: user.teamId, roomId: room.id });
        await joinTeam({ userId: user.id, teamId: newTeamId, roomId: room.id });
        changeTeam(newTeamId, user.teamId);
      }
    },
    [changeTeam, user.teamId, user.id, room.id]
  );

  const leaveTeam = useCallback(async () => {
    if (user.teamId) {
      await leaveTeamRequest({ userId: user.id, teamId: user.teamId, roomId: room.id });
      setTeamEmpty();
    }
  }, [room.id, setTeamEmpty, user.id, user.teamId]);

  const createTeam = useCallback(
    async (roomId: string) => {
      const teamId = await createNewTeam({
        name: `${user.name}'s team`,
        userId: user.id,
        roomId,
      });
      changeTeam(teamId, user.teamId);
    },
    [changeTeam, user.id, user.name, user.teamId]
  );

  return { switchTeam, createTeam, leaveTeam };
};

export default useTeam;
