import { patchApi, postApi } from "./api";

const BASE_URL = "/users";

const post = postApi(BASE_URL);

export const signUp = async (name: string, socketId: string) => await post({ name, socketId });
