import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Team, User } from "../../models";

interface Props {
  team: Team;
  joinTeam: () => void;
  currentUser: User;
  disabled: boolean;
  leaveTeam: () => void;
}

const TeamComponent: FC<Props> = ({ team, joinTeam, currentUser, disabled, leaveTeam }) => {
  const isCurrentTeam = currentUser.teamId === team.id;

  return (
    <Card sx={{ width: "11rem" }}>
      <CardContent>
        <Typography fontWeight="500" variant="body1">
          {team.name}
        </Typography>
        <Typography variant="body2">top guess:</Typography>
      </CardContent>
      <CardActions>
        {!isCurrentTeam ? (
          <Button disabled={disabled} size="small" onClick={joinTeam}>
            Join
          </Button>
        ) : (
          <Button
            sx={{ display: team.name === `${currentUser.name}'s team` ? "none" : "initial" }}
            size="small"
            onClick={leaveTeam}
            color="error"
          >
            Leave
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TeamComponent;
