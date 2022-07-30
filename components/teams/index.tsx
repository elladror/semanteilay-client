import { FC } from "react";
import useTeam from "../../hooks/useTeam";
import { Room } from "../../models";
import TeamComponent from "../teamComponent";

interface Props {
  room: Room;
}

const Teams: FC<Props> = ({ room }) => {
  const { switchTeam, name } = useTeam(room);

  return (
    <>
      {room.teams.map((team) => (
        <TeamComponent
          key={team.id}
          team={team}
          onClick={() => switchTeam(team.id)}
          isCurrentTeam={name === team.name}
        ></TeamComponent>
      ))}
    </>
  );
};

export default Teams;
