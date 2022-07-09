import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Team } from "../../models";

interface Props {
  team: Team;
}

const TeamComponent: FC<Props> = ({ team }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{team.name}</Typography>
        <Typography variant="body1">top guess:</Typography>
      </CardContent>
    </Card>
  );
};

export default TeamComponent;
