import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "../context/socket";
import { User } from "../models";
import { signUp as saveUser } from "../api/userApi";
import { UserContext, UserContextType } from "../context/userProvider";

const emptyUser: User = { name: "", id: "" };

const useUser = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const socket = useContext(SocketContext);
  const router = useRouter();

  const signOut = useCallback(() => {
    // warning: this function may be called more than once
    setUser(emptyUser); // TODO: when server goes down the entities currently stay in DB
  }, [setUser]);

  const signIn = (user: User) => {
    setUser(user);
  };

  const signUp = async ({ name }: Omit<User, "id">) => {
    const { id } = await saveUser(name, socket.id); // TODO: when socket disconnects delete user and go back to login
    signIn({ id, name });
  };

  const changeTeam = (teamId: string, oldTeamId?: string) => {
    if (teamId !== oldTeamId) {
      socket.emit("switchTeam", { newTeamId: teamId, oldTeamId: user.teamId });
      setUser({ ...user, teamId });
    }
  };

  const leaveTeam = useCallback(() => {
    setUser({ name: user.name, id: user.id });
  }, [user.name, user.id, setUser]);

  useEffect(() => {
    socket.on("disconnect", signOut);

    return () => {
      socket.removeListener("disconnect", signOut); // TODO: reconsider ux when refresh kicks you out
    };
  }, [socket, signOut]);

  useEffect(() => {
    if (user.name === "" && router.pathname !== "/") {
      router.push("/");
    }
  }, [router, user]);

  return { user, signUp, signOut, changeTeam, leaveTeam };
};

export default useUser;
