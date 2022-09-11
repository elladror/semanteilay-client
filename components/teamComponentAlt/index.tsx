import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Team } from "../../models";
import Rank from "../rank";

interface Props {
  team: Team;
  show: boolean;
}

const TeamComponentAlt: FC<Props> = ({ team, show }) => {
  const { name, topGuess } = team;

  return (
    <Card raised={true} sx={show ? { width: "8rem", p: 1.5, pb: 0.75 } : { display: "none" }}>
      <Typography
        fontWeight="500"
        variant="body1"
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          pb: "0.25rem",
        }}
      >
        {name}
      </Typography>{" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          lineHeight: 0,
          alignContent: "center",
          alignItems: "center",
          height: "2rem",
        }}
      >
        {topGuess.rank < 0 ? (
          topGuess.score === 0 ? (
            <Typography fontSize={"0.75rem"} textOverflow={"ellipsis"} noWrap={true}>
              (יאללה להתחיל לנחש)
            </Typography>
          ) : (
            <Avatar
              sx={{
                width: "2rem",
                height: "2rem",
                fontSize: "0.62rem",
              }}
            >
              {topGuess.score}
            </Avatar>
          )
        ) : (
          <Box sx={{ width: "8rem" }}>
            <Rank rank={topGuess.rank}></Rank>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default TeamComponentAlt;
