import { Avatar, Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Team, User } from "../../models";
import PlayersPopover from "../playersPopover";
import Rank from "../rank";

interface Props {
  team: Team;
  joinTeam: () => void;
  currentUser: User;
  disabled: boolean;
  leaveTeam: () => void;
}

const TeamComponent: FC<Props> = ({ team, joinTeam, currentUser, disabled, leaveTeam }) => {
  const isCurrentTeam = currentUser.teamId === team.id;
  const { name, topGuess, _count } = team;

  return (
    <Card raised={true} sx={{ width: "12.5rem" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight="500" variant="body1" sx={{ pb: "1rem" }}>
            {name}
          </Typography>{" "}
          <PlayersPopover memberCount={_count?.members} members={team.members} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", pb: "0.5rem" }}>
          <Avatar
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              fontSize: "0.8rem",
              visibility: topGuess.score === 0 ? "hidden" : "initial",
            }}
          >
            {topGuess.score}
          </Avatar>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "8rem" }}>
            <Rank rank={topGuess.rank}></Rank>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography fontSize={"0.7rem"}>
            {topGuess.score === 0
              ? "(יאללה להתחיל לנחש)"
              : topGuess.rank > 0
              ? `${topGuess.rank} / 1000`
              : `(לא מתקרבים פה אפילו)`}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {!isCurrentTeam ? (
          <Button disabled={disabled} size="small" onClick={joinTeam}>
            Join
          </Button>
        ) : (
          <Button size="small" onClick={leaveTeam} color="error">
            Leave
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TeamComponent;
