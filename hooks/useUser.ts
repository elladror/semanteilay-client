import { useCallback, useContext } from "react";
import { SocketContext } from "../context/socket";
import { User } from "../models";
import { signUp as saveUser } from "../api/userApi";
import { UserContext, UserContextType } from "../context/userProvider";

const useUser = () => {
  const { user, signIn, setTeam, setRoom } = useContext(UserContext) as UserContextType;
  const socket = useContext(SocketContext);

  const signUp = useCallback(
    async ({ name }: Omit<User, "id">) => {
      if (socket.connected) {
        const { id } = await saveUser(name, socket.id);
        signIn({ id, name });
      } else {
        console.error("socket not connected"); // TODO: implement
      }
    },
    [socket.id, socket.connected, signIn]
  );

  const changeTeam = (teamId: string, oldTeamId?: string) => {
    if (teamId !== oldTeamId) {
      socket.emit("switchTeam", { newTeamId: teamId, oldTeamId: user.teamId });
      setTeam(teamId);
    }
  };

  const changeRoom = (roomId: string) => {
    if (user.roomId !== roomId) {
      setRoom(roomId);
    }
  };

  const leaveTeam = useCallback(() => {
    setTeam("");
  }, [setTeam]);

  return { user, signUp, changeTeam, leaveTeam, changeRoom };
};

export default useUser;
