import Button from "@mui/material/Button/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Team } from "../../models";

interface Props {
  team: Team;
  onClick: () => void;
  isCurrentTeam: boolean;
}

const TeamComponent: FC<Props> = ({ team, onClick, isCurrentTeam = false }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{team.name}</Typography>
        <Typography variant="body1">top guess:</Typography>
      </CardContent>
      <CardActions>
        {!isCurrentTeam ? (
          <Button size="small" onClick={onClick}>
            Join
          </Button>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};

export default TeamComponent;
