import axios, { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:9000";

export const getApi =
  (baseUrl: string) =>
  async ({ path = "", payload = {} }) => {
    try {
      const res = await axios.get(`${SERVER_URL + baseUrl + path}`, {
        params: payload,
      });
      return res.data;
    } catch (e) {
      if ((e as AxiosError).message === "Network Error")
        throw new ApiError(400, "No Internet Connection");

      const res = (e as AxiosError).response;
      if (res) throw new ApiError(res.status, res.data as string);

      throw new ApiError(500, "unknown");
    }
  };

export const postApi =
  (baseUrl: string) =>
  async (payload = {}, path = "") => {
    try {
      const res = await axios.post(`${SERVER_URL + baseUrl + path}`, payload);
      return res.data;
    } catch (e) {
      if ((e as AxiosError).message === "Network Error")
        throw new ApiError(400, "No Internet Connection");

      const res = (e as AxiosError).response;
      if (res) throw new ApiError(res.status, res.data as string);

      throw new ApiError(500, "unknown");
    }
  };

export const patchApi =
  (baseUrl: string) =>
  async ({ payload = {}, path = "" }) => {
    try {
      const res = await axios.patch(`${SERVER_URL + baseUrl + path}`, payload);
      return res.data;
    } catch (e) {
      console.log(e);
      if ((e as AxiosError).message === "Network Error")
        throw new ApiError(400, "No Internet Connection");

      const res = (e as AxiosError).response;
      if (res) throw new ApiError(res.status, res.data as string);

      throw new ApiError(500, "unknown");
    }
  };

export const deleteApi =
  (baseUrl: string) =>
  async (payload = {}, path = "") => {
    try {
      const res = await axios.delete(`${SERVER_URL + baseUrl + path}`, payload);
      return res.data;
    } catch (e) {
      if ((e as AxiosError).message === "Network Error")
        throw new ApiError(400, "No Internet Connection");

      const res = (e as AxiosError).response;
      if (res) throw new ApiError(res.status, res.data as string);

      throw new ApiError(500, "unknown");
    }
  };

export const fetcher = (url: string, suffix = "") =>
  axios.get(url + suffix).then((res) => res.data);
