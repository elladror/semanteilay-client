import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:9000";

export const getApi =
  (baseUrl: string) =>
  async ({ path = "", payload = {} }) => {
    const res = await axios.get(`${SERVER_URL + baseUrl + path}`, {
      params: payload,
    });

    if (res.status !== 200) throw new ApiError(res.status, res.statusText);

    return res.data;
  };

export const postApi =
  (baseUrl: string) =>
  async (payload = {}, path = "") => {
    const res = await axios.post(`${SERVER_URL + baseUrl + path}`, payload);

    if (res.status !== 200) throw new ApiError(res.status, res.statusText);

    return res.data;
  };

export const patchApi =
  (baseUrl: string) =>
  async ({ payload = {}, path = "" }) => {
    const res = await axios.patch(`${SERVER_URL + baseUrl + path}`, payload);

    if (res.status !== 200) throw new ApiError(res.status, res.statusText);

    return res.data;
  };

export const deleteApi =
  (baseUrl: string) =>
  async (payload = {}, path = "") => {
    const res = await axios.delete(`${SERVER_URL + baseUrl + path}`, payload);

    if (res.status !== 200) throw new ApiError(res.status, res.statusText);

    return res.data;
  };
export const fetcher = (url: string, suffix = "") =>
  axios.get(url + suffix).then((res) => res.data);
