import { useCallback, useContext, useEffect } from "react";
import useUser from "./useUser";
import { changeUserTeam, createTeam } from "../api/teamsApi";
import { SocketContext } from "../context/socket";

const useTeam = () => {
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
        await changeUserTeam({ userId: user.id, teamId: newTeamId, oldTeamId: user.teamId });
        changeTeam(newTeamId, user.teamId);
      }
    },
    [changeTeam, user.teamId, user.id]
  );

  const leaveTeam = useCallback(
    async (roomId: string) => {
      const teamId = await createTeam({
        name: `${user.name}'s team`,
        userId: user.id,
        roomId,
        oldTeamId: user.teamId,
      });
      changeTeam(teamId, user.teamId);
    },
    [changeTeam, user.id, user.name, user.teamId]
  );

  return { switchTeam, leaveTeam };
};

export default useTeam;
