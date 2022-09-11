import { createContext, FC, ReactNode, useContext, useState, useCallback, useEffect } from "react";
import { User } from "../models";
import { SocketContext } from "../context/socket";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { joinRoom as joinRoomRequest, login, setIdle } from "../api/userApi";
import { ApiError } from "next/dist/server/api-utils";

export type UserContextType = {
  user: User;
  setTeam: (teamId: string) => void;
  setRoom: (teamId: string) => void;
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
  const [isReady, setReady] = useState(false);

  const goToLobby = useCallback(() => {
    router.push("/");
  }, [router]);

  const joinRoom = useCallback(
    async (roomId: string, user: User) => {
      if (user.roomId !== roomId) {
        await joinRoomRequest({ userId: user.id, roomId, socketId: socket.id });
        setUser({ ...user, roomId });
      }

      socket.emit("joinRoom", roomId);
      if (user.teamId) socket.emit("switchTeam", { newTeamId: user.teamId });
    },
    [socket]
  );

  const socketConnectHandler = useCallback(
    async (id?: string) => {
      setLoading(true);

      if ((isReady || id) && socket.connected) {
        console.log("router is ready");
        const queryRoomId = id ?? (router.query.id as string);

        try {
          if (!userId) throw new Error();

          const loggedInUser = await login({ userId, socketId: socket.id });
          setUser(loggedInUser);
          const { roomId } = loggedInUser;

          if (!roomId) {
            if (router.pathname === "/room" && queryRoomId !== undefined) {
              // has no existing room, url to room -> join and let navigate to room
              try {
                await joinRoom(queryRoomId, loggedInUser);
                setLoading(false);
              } catch (e) {
                // room in url doesn't exist

                if ((e as ApiError).statusCode === 404) {
                  goToLobby();
                } else {
                  throw e;
                }
              }
            } else {
              // no existing room or url room

              goToLobby();
            }
          } else if (router.pathname === "/room" && queryRoomId !== undefined) {
            if (roomId === queryRoomId) {
              // existing room is the room in url

              await joinRoom(queryRoomId, loggedInUser);
              setLoading(false);
            } else {
              // existing room different than one in url

              goToLobby();
            }
          } else {
            // didnt  have room in url but has existing room

            await joinRoom(roomId, loggedInUser);
            router.push({ pathname: "/room", query: { id: roomId } });
          }
        } catch (error) {
          setUserId("");
          router.push("/login");
        } finally {
          router.events.on("routeChangeComplete", () => setLoading(false));
          router.events.on("routeChangeError", () => router.push("/login"));
          // setLoading(false); // TODO: fix flash of other page with router.events.on("routeChangeComplete")
        }
      } else {
        console.log("router is not ready");
      }
    },
    [isReady, socket.connected, socket.id, router, userId, joinRoom, goToLobby, setUserId]
  );

  useEffect(() => {
    if (router.isReady && !isReady) {
      setReady(true);
      socketConnectHandler(router.query.id as string);
    }
  }, [setReady, socketConnectHandler, isReady, router]);

  useEffect(() => {
    socket.on("connect", socketConnectHandler);

    return () => {
      socket.removeListener("connect", socketConnectHandler);
    };
  }, [socketConnectHandler, socket]);

  const signIn = (user: User) => {
    setUser(user);
    setUserId(user.id);
  };

  const setTeam = (teamId: string) => {
    setUser({ ...user, teamId });
  };

  const setRoom = useCallback(
    (roomId: string) => {
      setUser({ ...user, roomId });
    },
    [user]
  );

  useEffect(() => {
    const socketDisconnectHandler = () => {
      setIdle(user.id);
    };

    socket.on("disconnect", socketDisconnectHandler);

    return () => {
      socket.removeListener("disconnect", socketDisconnectHandler);
    };
  }, [socket, user.id]);

  if (isLoading) return <></>; // TODO: implement loader or something

  return (
    <UserContext.Provider value={{ user, setTeam, signIn, setRoom }}>
      {children}
    </UserContext.Provider>
  );
};
