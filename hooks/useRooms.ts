import { User } from "../models";
import { useCallback } from "react";
import { createTeam as createNewTeam } from "../api/teamsApi";
import { useRouter } from "next/router";

export const useRooms = ({
  user,
  changeTeam,
}: {
  user: User;
  changeTeam: (teamId: string) => void;
}) => {
  const router = useRouter();

  const joinRoom = useCallback(
    async (roomId: string) => {
      const teamId = await createNewTeam({ name: `${user.name}'s team`, userId: user.id, roomId });
      changeTeam(teamId);
      router.push({ pathname: "/room", query: { id: roomId } }); // TODO: add "as" but have ability to refresh (with rewrites)
    },
    [changeTeam, user.id, user.name, router]
  );

  return {
    joinRoom,
  };
};
