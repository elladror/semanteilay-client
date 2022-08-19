import { createContext, FC, ReactNode, useContext, useState, useCallback, useEffect } from "react";
import { User } from "../models";
import { SocketContext } from "../context/socket";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { login, setIdle } from "../api/userApi";

export type UserContextType = {
  user: User;
  setTeam: (teamId: string) => void;
  signIn: (user: User) => void;
};

type Props = {
  children?: ReactNode;
};

const emptyUser: User = { name: "", id: "" };

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState(emptyUser);
  const socket = useContext(SocketContext);
  const router = useRouter();
  const [userId, setUserId] = useLocalStorage("se-userId", "");
  const [isLoading, setLoading] = useState(false);

  const socketConnectHandler = useCallback(async () => {
    setLoading(true);

    try {
      if (!userId) throw new Error();

      const loggedInUser = await login({ userId, socketId: socket.id });
      setUser(loggedInUser);
      const { roomId } = loggedInUser;

      if (roomId) {
        socket.emit("joinRoom", roomId);
        router.push({ pathname: "/room", query: { id: roomId } });
      }
    } catch (error) {
      setUserId("");
      router.push("/login");
    } finally {
      setLoading(false); // TODO: fix flash of other page with router.events.on("routeChangeComplete")
    }
  }, [router, setUserId, socket, userId]);

  useEffect(() => {
    socket.on("connect", socketConnectHandler);

    return () => {
      socket.removeListener("connect", socketConnectHandler);
    };
  }, [socketConnectHandler, socket]);

  const socketDisconnectHandler = useCallback(() => {
    console.log("set idle called");
    setIdle(user.id);
  }, [user?.id]);

  const signIn = (user: User) => {
    setUser(user);
    setUserId(user.id);
  };

  const setTeam = (teamId: string) => {
    setUser({ ...user, teamId });
  };

  useEffect(() => {
    socket.on("disconnect", socketDisconnectHandler);

    return () => {
      socket.removeListener("disconnect", socketDisconnectHandler);
    };
  }, [socket, socketDisconnectHandler]);

  if (isLoading) return <></>; // TODO: implement loader or something

  return <UserContext.Provider value={{ user, setTeam, signIn }}>{children}</UserContext.Provider>;
};

export const useCurrentUser = () => useContext(UserContext);
