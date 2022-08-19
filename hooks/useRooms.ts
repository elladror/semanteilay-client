import { useCallback, useContext } from "react";
import { createTeam } from "../api/teamsApi";
import { useRouter } from "next/router";
import useUser from "./useUser";
import { SocketContext } from "../context/socket";
import { joinRoom as userJoinRoom } from "../api/userApi";

export const useRooms = () => {
  const router = useRouter();
  const { user, changeTeam } = useUser();
  const socket = useContext(SocketContext);

  const joinRoom = useCallback(
    async (roomId: string) => {
      await userJoinRoom({ userId: user.id, roomId });
      const teamId = await createTeam({
        name: `${user.name}'s team`,
        userId: user.id,
        roomId,
      });
      changeTeam(teamId);
      socket.emit("joinRoom", roomId);
      router.push({ pathname: "/room", query: { id: roomId } }); // TODO: add "as" but have ability to refresh (with rewrites)
    },
    [changeTeam, user.id, user.name, router, socket]
  );

  return {
    joinRoom,
  };
};
