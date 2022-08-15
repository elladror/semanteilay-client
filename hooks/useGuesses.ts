import { addGuess as postGuess, GET_ALL_TEAM_GUESSES_URL as url } from "../api/guessApi";
import { fetcher } from "../api/api";
import useSWR from "swr";
import { Guess, GuessCreationInput } from "../models";
import { useContext, useEffect, useReducer } from "react";
import useUser from "./useUser";
import { SocketContext } from "../context/socket";

function reducer(
  state: Guess[],
  action:
    | { payload: Guess[]; type: "update" }
    | { payload: Guess; type: "add" }
    | { payload: Guess; type: "refresh" }
) {
  switch (action.type) {
    case "add":
      return [action.payload, ...state.sort((guess, otherGuess) => otherGuess.score - guess.score)];
    case "update":
      return action.payload;
    case "refresh":
      const guessToTop = action.payload;
      return [
        guessToTop,
        ...state
          .filter((currentGuess) => guessToTop.id !== currentGuess.id)
          .sort((guess, otherGuess) => otherGuess.score - guess.score),
      ];
    default:
      throw new Error();
  }
}

export const useGuesses = () => {
  const socket = useContext(SocketContext);
  const { user } = useUser();
  const { data, error } = useSWR([url, user.teamId], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [guesses, dispatch] = useReducer(reducer, []); // TODO: test if init function can replace useEffect

  useEffect(() => {
    dispatch({ payload: data ?? ([] as Guess[]), type: "update" });
  }, [data]);

  useEffect(() => {
    const addGuess = (guess: Guess) => {
      dispatch({ payload: guess, type: "add" });
    };
    socket.on("newGuess", addGuess);

    return () => {
      socket.removeListener("newGuess", addGuess);
    };
  }, [socket]);

  const doesGuessExist = ({ word }: { word: string }) =>
    guesses.some((current) => current.word === word);

  const addGuess = async (guess: GuessCreationInput) => {
    if (doesGuessExist(guess)) {
      const existingGuess = guesses.find(
        (currentGuess) => guess.word === currentGuess.word
      ) as Guess;
      dispatch({ payload: existingGuess, type: "refresh" });
    } else {
      const newGuess = await postGuess(guess);
      dispatch({ payload: newGuess, type: "add" });
      socket.emit("newGuess", newGuess);
    }
  };

  return {
    guesses,
    isLoading: !error && !guesses,
    isError: !!error,
    addGuess,
  };
};
