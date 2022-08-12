import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Team } from "../../models";

interface Props {
  team: Team;
  onClick: () => void;
  isCurrentTeam: boolean;
  disabled: boolean;
}

const TeamComponent: FC<Props> = ({ team, onClick, isCurrentTeam = false, disabled }) => {
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
          <Button disabled={disabled} size="small" onClick={onClick}>
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
