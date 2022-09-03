import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FC } from "react";
import { Guess } from "../../models";
import Rank from "../rank";

interface Props {
  guess: Guess;
}

const Guess: FC<Props> = ({
  guess: {
    rank,
    word,
    score,
    owner: { name: guesser },
    serialNumber,
  },
}) => {
  return (
    <>
      <TableRow sx={{ "&:not(:first-of-type) td": { border: 0, paddingTop: 1 } }}>
        <TableCell align="center" sx={{ width: 150 }}>
          <Rank rank={rank} />
        </TableCell>
        <TableCell align="center">{word}</TableCell>
        <TableCell align="center">{score}</TableCell>
        <TableCell
          align="center"
          sx={{ maxWidth: 20, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {guesser}
        </TableCell>
        <TableCell align="center" sx={{ width: 20 }}>
          {serialNumber}
        </TableCell>
      </TableRow>
    </>
  );
};

export default Guess;
