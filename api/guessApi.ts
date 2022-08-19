import { getApi, postApi, SERVER_URL } from "./api";
import { GuessCreationInput } from "../models/index";

const BASE_URL = "/guesses";

const get = getApi(BASE_URL);
const post = postApi(BASE_URL);

export const addGuess = async (guess: GuessCreationInput) => await post(guess);

export const getAllGuesses = async () => await get({});

export const GET_ALL_TEAM_GUESSES_URL = `${SERVER_URL + BASE_URL}/`;
