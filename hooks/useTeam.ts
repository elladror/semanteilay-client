import { useCallback } from "react";
import useUser from "./useUser";

const useTeam = () => {
  const { user, changeTeam, leaveTeam } = useUser();

  const switchTeam = useCallback(
    async (newTeamId: string) => {
      if (user.teamId !== newTeamId) {
        await changeTeam(newTeamId, user.teamId);
      }
    },
    [changeTeam, user.teamId]
  );

  return { switchTeam, leaveTeam };
};

export default useTeam;
