import { FC } from "react";
import { Team } from "../../models";
import TeamComponent from "../teamComponent";

interface Props {
  teams: Team[];
}

const Teams: FC<Props> = ({ teams }) => {
  return (
    <>
      {teams.map((team) => (
        <TeamComponent key={team.id} team={team}></TeamComponent>
      ))}
    </>
  );
};

export default Teams;
