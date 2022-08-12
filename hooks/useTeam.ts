import { useCallback } from "react";
import useSWR from "swr";
import { fetcher } from "../api/api";
import { GET_TEAM_BY_ID_URL as url } from "../api/teamsApi";
import useUser from "./useUser";

// TODO: find use / delete updateRoom
const useTeam = () => {
  const { user, changeTeam, leaveTeam } = useUser();
  const { data: team } = useSWR(user.teamId ? [url, user.teamId] : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const switchTeam = useCallback(
    (newTeamId: string) => {
      if (user.teamId !== newTeamId) {
        changeTeam(newTeamId, user.teamId);
      }
    },
    [changeTeam, user.teamId]
  );

  return { name: team?.name, switchTeam, leaveTeam };
};

export default useTeam;
