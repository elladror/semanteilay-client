import { FC } from "react";
import MakeGuess from "../makeGuess";
import { useGuesses } from "../../hooks/useGuesses";
import useUser from "../../hooks/useUser";
import Guess from "../guess";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Guesses: FC = () => {
  const { guesses, addGuess, isLoading, isError, guess } = useGuesses();
  const { user } = useUser();

  if (isError || isLoading) return <h1>hi</h1>;

  return (
    <>
      <MakeGuess
        handleGuess={async (word: string) => {
          try {
            const { similarity: score, distance: rank } = await guess(word);
            addGuess({ word, score, rank, owner: user.id, team: user.teamId as string });
          } catch (err) {
            console.log("Don't know that word"); // TODO: implement don't know the word
          }
        }}
      />
      <Table
        sx={{
          maxWidth: 600,
          minWidth: 300,
          "& .MuiTableCell-head": { fontWeight: "bold" },
          "& .MuiTableCell-body": { padding: 0 },
        }}
      >
        <TableHead>
          <TableRow sx={{ "& th": { border: 0 } }}>
            <TableCell align="center"></TableCell>
            <TableCell align="center">מתחמם</TableCell>
            <TableCell align="center">ניחוש</TableCell>
            <TableCell align="center">קרבה</TableCell>
            <TableCell align="center">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guesses.map((guess) => (
            <Guess key={guess.word} guess={guess} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Guesses;
