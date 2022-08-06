import { Box } from "@mui/material";
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
    <Box
      sx={{
        display: { xs: "-webkit-box", sm: "flex" },
        gap: 1,
        maxWidth: { xs: 300, sm: 600, md: 900, lg: 1100 },
        scrollSnapType: "x mandatory",
        "& > *": {
          scrollSnapAlign: "center",
        },
        flexWrap: { sm: "wrap" },
        justifyContent: { sm: "space-evenly" },
        overflow: { xs: "auto", sm: "initial" },
        ":last-child": { paddingInlineEnd: 1 },
        "&::-webkit-scrollbar": {
          width: "0.5em",
        },
      }}
    >
      {room.teams.map((team) => (
        <TeamComponent
          key={team.id}
          team={team}
          onClick={() => switchTeam(team.id)}
          isCurrentTeam={name === team.name}
        ></TeamComponent>
      ))}
    </Box>
  );
};

export default Teams;
