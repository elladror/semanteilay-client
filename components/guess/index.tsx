import { TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { Guess } from "../../models";
import Rank from "../rank";

interface Props {
  guess: Guess;
}

const Guess: FC<Props> = ({ guess }) => {
  return (
    <>
      <TableRow sx={{ "&:not(:first-child) td": { border: 0, paddingTop: 1 } }}>
        <TableCell align="center" sx={{ width: 150 }}>
          <Rank rank={guess.rank} />
        </TableCell>
        <TableCell align="center">{guess.rank > 0 ? `${guess.rank} / 1000` : `(קר)`}</TableCell>
        <TableCell align="center">{guess.word}</TableCell>
        <TableCell align="center">{guess.score}</TableCell>
        <TableCell align="center" sx={{ width: 20 }}>
          {guess.serialNumber}
        </TableCell>
      </TableRow>
    </>
  );
};

export default Guess;
