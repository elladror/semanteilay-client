import { FC } from "react";
import MakeGuess from "../makeGuess";
import { useGuesses } from "../../hooks/useGuesses";
import useUser from "../../hooks/useUser";
import Guess from "../guess";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Room } from "../../models";

interface GuessesProps {
  room: Room;
  isUserTeamInRoom: boolean;
}

const Guesses: FC<GuessesProps> = ({ room, isUserTeamInRoom }) => {
  const { user } = useUser();

  const { guesses, addGuess, isLoading, isError } = useGuesses({
    isUserTeamInRoom,
  });

  if (isError) return <h1>hi</h1>;

  return (
    <>
      <MakeGuess
        disable={!isUserTeamInRoom}
        handleGuess={async (word: string) => {
          try {
            addGuess({
              word,
              ownerId: user.id,
              teamId: user.teamId as string,
              roomId: room.id,
            });
          } catch (err) {
            console.log("Don't know that word"); // TODO: implement don't know the word
          }
        }}
      />
      {isUserTeamInRoom ? (
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
              <Guess key={guess.id} guess={guess} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">Join or create a team to play!</Typography>
        </Box>
      )}
    </>
  );
};

export default Guesses;
