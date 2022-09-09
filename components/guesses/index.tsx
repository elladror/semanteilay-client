import { FC } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { Guess } from "../../models";
import GuessComponent from "../guess";
import { TableContainer } from "@mui/material";

interface GuessesProps {
  guesses: Guess[];
  isUserTeamInRoom: boolean;
}

const Guesses: FC<GuessesProps> = ({ guesses, isUserTeamInRoom }) => {
  return (
    <>
      {isUserTeamInRoom ? (
        <TableContainer sx={{ height: "45rem", display: "flex", justifyContent: "center" }}>
          <Table
            stickyHeader
            sx={{
              maxWidth: 600,
              minWidth: 300,
              "& .MuiTableCell-head": { fontWeight: "bold" },
              "& .MuiTableCell-body": { padding: 0 },
            }}
          >
            <TableHead>
              <TableRow sx={{ "& th": { border: 0 } }}>
                <TableCell align="center">מתחמם</TableCell>
                <TableCell align="center">ניחוש</TableCell>
                <TableCell align="center">קרבה</TableCell>
                <TableCell align="center" sx={{ padding: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PersonIcon color="action" />
                  </Box>
                </TableCell>
                <TableCell align="center">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guesses.map((guess) => (
                <GuessComponent key={guess.id} guess={guess} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ textAlign: "center", mt: 20 }}>
          <Typography variant="h4">Join or create a team to play!</Typography>
        </Box>
      )}
    </>
  );
};

export default Guesses;
