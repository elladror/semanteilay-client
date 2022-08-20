import { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "../context/socket";
import { joinRoom as userJoinRoom } from "../api/userApi";
import useUser from "./useUser";

export const useRooms = () => {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const { changeRoom } = useUser();

  const joinRoom = useCallback(
    async ({ userId, roomId }: { roomId: string; userId: string }) => {
      await userJoinRoom({ userId, roomId, socketId: socket.id });
      changeRoom(roomId);
      socket.emit("joinRoom", roomId);
      router.push({ pathname: "/room", query: { id: roomId } }); // TODO: add "as" but have ability to refresh (with rewrites)
    },
    [router, socket, changeRoom]
  );

  return {
    joinRoom,
  };
};
