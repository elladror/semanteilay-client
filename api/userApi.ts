import { User } from "../models";
import { patchApi, postApi } from "./api";

const BASE_URL = "/users";

const post = postApi(BASE_URL);

const patch = patchApi(BASE_URL);

export const signUp = async (name: string, socketId: string) => await post({ name, socketId });

export const login = async ({ userId, socketId }: { userId: string; socketId: string }) =>
  (await patch({ payload: { userId, socketId } })) as User;

export const setIdle = async (userId: string) =>
  (await patch({ path: "/idle", payload: { userId } })) as User;

export const leaveRoom = async (payload: { userId: string; roomId: string; socketId: string }) =>
  patch({
    path: "/leaveRoom",
    payload,
  });

export const joinRoom = async (payload: { userId: string; roomId: string; socketId: string }) =>
  patch({
    path: "/joinRoom",
    payload,
  });
