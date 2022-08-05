import { useCallback, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../api/api";
import { createTeam as createNewTeam, GET_TEAM_BY_ID_URL as url } from "../api/teamsApi";
import { Room } from "../models";
import useUser from "./useUser";

// TODO: find use / delete updateRoom
const useTeam = (room: Room) => {
  const { user, changeTeam, leaveTeam } = useUser();
  const [name, setName] = useState(user.teamId ? "" : `${user.name}'s team`);
  const { data: team, error } = useSWR(user.teamId ? [url, user.teamId] : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  (async () => {
    if (!user.teamId && room) {
      const teamId = await createNewTeam({ name, user, room });
      changeTeam(teamId, room?.id);
    }
  })();

  useEffect(() => {
    if (team) setName(team.name);
  }, [team, setName]);

  const switchTeam = useCallback(
    (newTeamId: string) => {
      if (user.teamId !== newTeamId) {
        changeTeam(newTeamId, room?.id, user.teamId);
      }
    },
    [changeTeam, room?.id, user.teamId]
  );

  return { name, switchTeam, leaveTeam };
};

export default useTeam;
