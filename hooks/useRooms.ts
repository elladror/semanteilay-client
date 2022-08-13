import { useCallback } from "react";
import { createTeam } from "../api/teamsApi";
import { useRouter } from "next/router";
import useUser from "./useUser";

export const useRooms = () => {
  const router = useRouter();
  const { user, changeTeam } = useUser();

  const joinRoom = useCallback(
    async (roomId: string) => {
      const teamId = await createTeam({
        name: `${user.name}'s team`,
        userId: user.id,
        roomId,
      });
      changeTeam(teamId);
      router.push({ pathname: "/room", query: { id: roomId } }); // TODO: add "as" but have ability to refresh (with rewrites)
    },
    [changeTeam, user.id, user.name, router]
  );

  return {
    joinRoom,
  };
};
